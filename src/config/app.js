// 应用配置
const medicines = require('../config/medicines');

module.exports = {
    prod: {
        // test1: {
        //     title: '标题',
        //     description: '描述',
        //     image: '－－－－',
        //     examineSchema: [{
        //         description: '实验方案1描述',
        //         examineSchemaName: 'test-e-a',
        //         examineSchemaNoType: 'TE20170210',
        //         examineParameters: null,
        //         samples: [{
        //             sampleName: 'samples-a-1',
        //             description: '样本描述',
        //             examineMethod: '实验方法',
        //             hasTargetRegionFile: false,
        //             analysisType: 'RNASeq',
        //             icon: 'blood',
        //             sampleType: '全血（DNA）',
        //             sampleNoType: 'TESTSAMPLE20170210',
        //             volume: '5ml',
        //             storageTransport: '4℃保存及运输',
        //             hasPathologyReport: false,
        //             parameters: {
        //                 platforms: ['illumina', 'life'],
        //             },
        //             sequenceType: 'PE',
        //             imageStage1: '－－－－',
        //             imageStage2: '－－－－',
        //         }],
        //     }]
        // },

        pharmacogene: {
            title: '药物基因组分析',
            description: '药物基因组分析是一种根据特定基因变异情况指定用药方案的分析应用',
            // image: 'image.micro-helix.com:5000/mh/test_app_bi_app:v1',
            image: 'image.micro-helix.com:5000/mh/drug_bi_app:v1',
            steps: {
                hasExperimentQC: false,
                hasSampleStage2: false
            },
            examineSchema: [{
                description: '药物基因组检测方案',
                examineSchemaName: 'pharmacogene-a',
                examineSchemaNoType: '110101',
                examineParameters: {
                    medicines: medicines
                },
                samples: [{
                    sampleName: 'pharmacogene-a-1',
                    description: '芯片',
                    examineMethod: '芯片', // 实验中文？？(参数)
                    hasTargetRegionFile: false,
                    analysisType: '芯片', // 实验方法(参数)
                    icon: 'blood',
                    sampleType: '血液',
                    sampleNoType: 'Z01BB111',
                    volume: '5ml',
                    storageTransport: '4℃保存及运输',
                    hasPathologyReport: false,
                    parameters: {
                        platforms: ['芯片']
                    },
                    sequenceType: 'SE',
                    imageStage1: 'image.micro-helix.com:5000/mh/drug_bi_qc:v1',
                    imageStage2: 'image.micro-helix.com:5000/mh/test_basic_bi_app_stage2:v1'
                }]
            }]

        },
        boneCancer: {
            title: '骨肿瘤实验分析',
            description: '骨肿瘤描述',
            // image: 'image.micro-helix.com:5000/mh/rnaseqdiff:v2',
            image: 'image.micro-helix.com:5000/mh/bone_cancer_bi_app:v1',
            steps: {
                hasExperimentQC: true,
                hasSampleStage2: true
            },
            examineSchema: [{
                description: '骨肿瘤A检测方案',
                examineSchemaName: 'bone-a',
                examineSchemaNoType: '110201',
                examineParameters: {

                },
                samples: [{
                    sampleName: 'bone-a-1',
                    description: '全外显子组测序（WES）',
                    examineMethod: '全外显子组测序（WES）', // 实验中文？？(参数)
                    hasTargetRegionFile: true,
                    analysisType: 'WES', // 实验方法(参数)
                    icon: '组织',
                    sampleType: '肿瘤组织',
                    sampleNoType: 'ATF1',
                    volume: '0.1g',
                    storageTransport: '干冰/液氮',
                    hasPathologyReport: true,
                    parameters: {
                        platforms: ['illumina', 'life']
                    },
                    sequenceType: 'PE',
                    imageStage1: '？？？image.micro-helix.com:5000/mh/wesbase:v5',
                    imageStage2: '？？？image.micro-helix.com:5000/mh/wesbase:v5'
                }, {
                    sampleName: 'bone-a-2',
                    description: '全转录组测序RNA-Seq',
                    examineMethod: '全转录组测序RNA-Seq',
                    hasTargetRegionFile: false,
                    analysisType: 'RNASeq',
                    icon: '组织',
                    sampleType: '肿瘤组织',
                    sampleNoType: 'ATF2',
                    volume: '0.1g',
                    storageTransport: '干冰/液氮',
                    hasPathologyReport: true,
                    parameters: {
                        platforms: ['illumina', 'life']
                    },
                    sequenceType: 'PE',
                    imageStage1: '？？？image.micro-helix.com:5000/mh/wesbase:v5',
                    imageStage2: '？？？image.micro-helix.com:5000/mh/wesbase:v5'
                }, {
                    sampleName: 'bone-a-3',
                    description: '全外显子组测序（WES）描述',
                    examineMethod: '全外显子组测序（WES）',
                    hasTargetRegionFile: true,
                    analysisType: 'WES', // 实验方法(参数)
                    icon: '血液',
                    sampleType: '血液',
                    sampleNoType: 'ABB111',
                    volume: '5ml',
                    storageTransport: '4℃保存及运输',
                    hasPathologyReport: false,
                    parameters: {
                        platforms: ['illumina', 'life'],
                    },
                    sequenceType: 'PE',
                    imageStage1: '？？？image.micro-helix.com:5000/mh/wesbase:v5',
                    imageStage2: '？？？image.micro-helix.com:5000/mh/wesbase:v5',
                }, {
                    sampleName: 'bone-a-4',
                    description: '全转录组测序RNA-Seq 描述',
                    examineMethod: '全转录组测序RNA-Seq',
                    hasTargetRegionFile: true,
                    analysisType: 'RNASeq', // 实验方法(参数)
                    icon: '血液',
                    sampleType: '血液',
                    sampleNoType: 'ABB122',
                    volume: '5ml',
                    storageTransport: '4℃保存及运输',
                    hasPathologyReport: false,
                    parameters: {
                        platforms: ['illumina', 'life'],
                    },
                    sequenceType: 'PE',
                    imageStage1: '？？？image.micro-helix.com:5000/mh/wesbase:v5',
                    imageStage2: '？？？image.micro-helix.com:5000/mh/wesbase:v5',
                }],
            }, {
                description: '骨肿瘤B检测方案（WES）',
                examineSchemaName: 'bone-b',
                examineSchemaNoType: '110202',
                samples: [{
                    sampleName: 'boneCancer-tumor-WES',
                    description: '全转录组测序RNA-Seq',
                    examineMethod: '全转录组测序RNA-Seq',
                    hasTargetRegionFile: false,
                    analysisType: 'WES',
                    icon: '组织',
                    sampleType: '肿瘤组织',
                    sampleNoType: 'BTF1',
                    volume: '0.1g',
                    storageTransport: '干冰/液氮',
                    hasPathologyReport: true,
                    parameters: {
                        platforms: ['illumina', 'life'],
                    },
                    sequenceType: 'PE',
                    imageStage1: '？？？image.micro-helix.com:5000/mh/wesbase:v5',
                    imageStage2: '？？？image.micro-helix.com:5000/mh/wesbase:v5',
                }, {
                    sampleName: 'boneCancer-blood-WES',
                    description: '全转录组测序RNA-Seq 描述',
                    examineMethod: '全转录组测序RNA-Seq',
                    hasTargetRegionFile: true,
                    analysisType: 'WES', // 实验方法(参数)
                    icon: '血液',
                    sampleType: '血液',
                    sampleNoType: 'BBB121',
                    volume: '5ml',
                    storageTransport: '4℃保存及运输',
                    hasPathologyReport: false,
                    parameters: {
                        platforms: ['illumina', 'life'],
                    },
                    sequenceType: 'PE',
                    imageStage1: '？？？image.micro-helix.com:5000/mh/wesbase:v5',
                    imageStage2: '？？？image.micro-helix.com:5000/mh/wesbase:v5',
                }],
            }, {
                description: '骨肿瘤C检测方案（RNASeq）',
                examineSchemaName: 'bone-c',
                examineSchemaNoType: '110203',
                samples: [{
                    sampleName: 'boneCancer-blood-RNASeq',
                    description: '全转录组测序RNA-Seq',
                    examineMethod: '全转录组测序RNA-Seq',
                    hasTargetRegionFile: true,
                    analysisType: 'RNASeq',
                    icon: '组织',
                    sampleType: '血液',
                    sampleNoType: 'BTF1',
                    volume: '0.1g',
                    storageTransport: '干冰/液氮',
                    hasPathologyReport: true,
                    parameters: {
                        platforms: ['illumina', 'life'],
                    },
                    sequenceType: 'PE',
                    imageStage1: 'image.micro-helix.com:5000/mh/rnaseqbase:v1',
                    imageStage2: 'image.micro-helix.com:5000/mh/rnaseqcount:v1',
                }, {
                    sampleName: 'boneCancer-tumor-RNASeq',
                    description: '全转录组测序RNA-Seq 描述',
                    examineMethod: '全转录组测序RNA-Seq',
                    hasTargetRegionFile: false,
                    analysisType: 'RNASeq',
                    icon: '组织',
                    sampleType: '肿瘤组织',
                    sampleNoType: 'BTF2',
                    volume: '0.1g',
                    storageTransport: '干冰/液氮',
                    hasPathologyReport: true,
                    parameters: {
                        platforms: ['illumina', 'life'],
                    },
                    sequenceType: 'PE',
                    imageStage1: 'image.micro-helix.com:5000/mh/rnaseqbase:v1',
                    imageStage2: 'image.micro-helix.com:5000/mh/rnaseqcount:v1',
                }],
            }],
        },
    },
    dev: {

    }
};
