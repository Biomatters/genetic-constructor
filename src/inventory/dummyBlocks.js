import Block from '../models/Block';

const dummyBlocks = ['Kozak-ATG-NLS', 'Linker 2', 'Linker 3', 'Kozak-ATG', 'NES-STOP', 'KDEL-STOP', 'Linker 1', 'P2A -1', 'p2A-2', 'Kozak-ATG-palmitoylation sequence', 'Kozak-ATG-IgK leader', 'Kozak-ATG-MLS', 'SV40 intron', 'SV40 polyA', 'SV40 ORI', 'Insulator FB', 'Tetracycline-dep ribozyme', 'PGK polyA', 'BGH-polyA', 'DmrC', 'DmrA', 'SV40 promoter', 'TRE3GS promoter', 'CMV promoter', 'CAG promoter', 'IRES2 (with ATG)', 'PuroR-1', 'PuroR-2', 'PuroR-3', 'mNeonGreen-1', 'mRuby2-1', 'mTagBFP-1', 'mNeonGreen-2', 'mRuby2-2', 'mTagBFP-2', 'mNeonGreen-3', 'mRuby2-3', 'mTagBFP-3', 'Kozak-ATG-Tet-ON-3G', 'Rosa 5 Arm', 'Insulator synthetic IS2', 'Rosa 3 Arm', 'chimaeric intron (from SP203)', 'EF1a promoter', 'Tubulin']
  .map((item) => {
    return new Block({
      metadata: {
        name: item,
      },
    });
  });

export default dummyBlocks;
