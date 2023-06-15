const faq = [
    // {
    //     templateCode: 'textsimple',
    //     data: { text: '이것은 버튼 그룹입니다.' },
    // },
    {
        templateCode: 'chipButtonGroup',
        data: [
            {
                text: 'card Info',
                type: 'action',
                query: '기본 카드 보여줘',
                tempData: 'cardInfo',
            },
            {
                text: '보유계좌 요약',
                type: 'action',
                query: '내가 보유한 카드 리스트 보여줘..',
                tempData: 'accountsummary',
            },
            {
                text: '보유계좌 없을때',
                type: 'action',
                query: '계좌알려줘',
                tempData: 'noAccount',
            },
            {
                text: '보유계좌 여러개',
                type: 'action',
                ' query': '계좌알려줘',
                tempData: ' swipeAnswer',
            },
            {
                text: '보유계좌 1개',
                type: 'action',
                ' query': '계좌알려줘',
                tempData: 'oneAccount',
            },
            {
                text: 'Simple Text',
                type: 'action',
                query: 'textSimple',
                tempData: 'text',
            },
            {
                text: '통장 거래내역',
                type: 'action',
                query: '통장 거래내역 알려줘 ',
                tempData: 'formAccountounForPaper',
            },
            {
                text: '보유카드 요약',
                type: 'action',
                query: '내가 보유한 카드 리스트 보여줘.',
                tempData: 'cardsummary',
            },
            {
                text: '보유카드 없을때',
                type: 'action',
                query: '보유카드 알려줘',
                tempData: 'nocandy',
            },
            {
                text: '보유카드 여러개',
                type: 'action',
                ' query': '보유카드 알려줘',
                tempData: 'swipeAnswerOwnCard',
            },
            {
                text: '보유카드 1개',
                type: 'action',
                query: '보유카드 알려줘',
                tempData: 'onecand',
            },
        ],
    },
]
