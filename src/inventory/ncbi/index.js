import rejectingFetch from '../../middleware/rejectingFetch';
import queryString from 'query-string';
import Block from '../../models/Block';
import merge from 'lodash.merge';
import { convertGenbank } from '../../middleware/api';

// NCBI limits number of requests per user/ IP, so better to initate from the client and I support process on client...
export const name = 'NCBI';

//todo - handle RNA

//convert genbank file to bunch of blocks
//assume there is always one root construct
//returns array in form [construct, ...blocks]
const genbankToBlock = (gb) => {
  return convertGenbank(gb)
    .then(result => {
      const { blocks, roots } = result;
      const constructIndex = blocks.findIndex(block => block.id === roots[0]);
      const construct = blocks.splice(constructIndex, 1);
      return [...construct, ...blocks];
    });
};

const wrapBlock = (block, id) => {
  return new Block(merge({}, block, {
    source: {
      source: 'ncbi',
      id: id,
    },
  }));
};

const parseSummary = (summary) => {
  return {
    metadata: {
      name: summary.caption,
      description: summary.title,
      organism: summary.organism,
    },
    sequence: {
      length: summary.slen,
    },
    source: {
      source: 'ncbi',
      id: summary.uid,
    },
  };
};

export const getSummary = (...ids) => {
  const idList = ids.join(',');

  const url = `http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=nuccore&id=${idList}&retmode=json`;

  return rejectingFetch(url)
    .then(resp => resp.json())
    .then(json => {
      //returns dictionary of UID -> ncbi entry, with extra key uids
      const results = json.result;
      delete results.uids;
      //return array of results
      return Object.keys(results).map(key => results[key]);
    })
    .then(results => results.map(result => parseSummary(result)));
};

// http://www.ncbi.nlm.nih.gov/books/NBK25499/#chapter4.EFetch
//note that these may be very very large, use getSummary unless you need the whole thing
export const get = (id) => {
  const parametersMapped = {
    format: 'gb',
  };

  const { format } = parametersMapped;

  const url = `http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=${id}&rettype=${format}&retmode=text`;

  return rejectingFetch(url)
    .then(resp => resp.text())
    .then(genbankToBlock)
    .then(blocks => blocks.map(block => wrapBlock(block, id)));
};

//todo - deboucne
// http://www.ncbi.nlm.nih.gov/books/NBK25499/#chapter4.ESearch
export const search = (query, options = {}) => {
  //parameters we support, in this format
  const parameters = Object.assign({
    start: 0,
    entries: 20,
  }, options);

  //mapped to NCBI syntax
  const mappedParameters = {
    retstart: parameters.start,
    retmax: parameters.entries,
    term: query,
    retmode: 'json',
  };

  const parameterString = queryString.stringify(mappedParameters);

  const url = `http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=nuccore&${parameterString}`;

  return rejectingFetch(url)
    .then(resp => resp.json())
    .then(json => json.esearchresult.idlist)
    .then(ids => getSummary(...ids));
};
