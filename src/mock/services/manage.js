import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const totalCount = 5701

const serverList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: tmpKey,
      no: 'No ' + tmpKey,
      description: '这是一段描述',
      callNo: Mock.mock('@integer(1, 999)'),
      status: Mock.mock('@integer(0, 3)'),
      updatedAt: Mock.mock('@datetime'),
      editable: false
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

const projects = () => {
  return builder({
    'data': [{
      id: 1,
      cover: '',
      title: '非法校准',
      description: '在纷争海岸用精准最后一击校准武器。遗失区域能最高效地提升进度。',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    },
    {
      id: 2,
      cover: '',
      title: '非法校准',
      description: '在纷争海岸用精准最后一击校准武器。遗失区域能最高效地提升进度。',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    },
    {
      id: 3,
      cover: '',
      title: '非法校准',
      description: '在纷争海岸用精准最后一击校准武器。遗失区域能最高效地提升进度。',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    },
    {
      id: 4,
      cover: '',
      title: '实地校准',
      description: '在打击、智谋和熔炉竞技场中针对目标校准武器。精准最后一击、使用能量或威能武器可获得额外进度。',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    },
    {
      id: 5,
      cover: '',
      title: '实地校准',
      description: '在打击、智谋和熔炉竞技场中针对目标校准武器。精准最后一击、使用能量或威能武器可获得额外进度。',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    },
    {
      id: 6,
      cover: '',
      title: '实地校准',
      description: '在打击、智谋和熔炉竞技场中针对目标校准武器。精准最后一击、使用能量或威能武器可获得额外进度。',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    }
    ],
    'pageSize': 10,
    'pageNo': 0,
    'totalPage': 6,
    'totalCount': 57
  })
}

const activity = () => {
  return builder([{
    id: 1,
    user: {
      nickname: '南瓜',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    },
    project: {
      name: '商品管理',
      action: '更新',
      event: '商品'
    },
    time: '2018-08-23 14:47:00'
  },
  {
    id: 1,
    user: {
      nickname: '人去空城°',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'
    },
    project: {
      name: '成员管理',
      action: '更新',
      event: '个人资料'
    },
    time: '2018-08-23 09:35:37'
  },
  {
    id: 1,
    user: {
      nickname: 'Joker',
      avatar: '@image(64x64)'
    },
    project: {
      name: '公会奖励管理',
      action: '创建',
      event: '公会奖励兑换码'
    },
    time: '2017-05-27 00:00:00'
  },
  {
    id: 1,
    user: {
      nickname: '人去空城°',
      avatar: '@image(64x64)'
    },
    project: {
      name: '任务列表',
      action: '更新',
      event: '非法校准悬赏'
    },
    time: '2018-08-23 14:47:00'
  },
  {
    id: 1,
    user: {
      nickname: '南瓜',
      avatar: '@image(64x64)'
    },
    project: {
      name: '公会奖励管理',
      action: '添加了',
      event: '公会奖励'
    },
    time: '2018-08-23 14:47:00'
  },
  {
    id: 1,
    user: {
      nickname: '南瓜',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    },
    project: {
      name: '任务管理',
      action: '添加了',
      event: '非法校准'
    },
    time: '2018-08-23 14:47:00'
  }
  ])
}

const teams = () => {
  return builder([{
    id: 1,
    name: '南瓜',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
  },
  {
    id: 2,
    name: '人去空城°',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png'
  },
  {
    id: 1,
    name: 'Saika',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png'
  },
  {
    id: 1,
    name: 'Joker',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png'
  }
  ])
}

const radar = () => {
  return builder([{
    item: '活跃度',
    '个人': 70,
    '公会': 30
  },
  {
    item: '任务完成度',
    '个人': 60,
    '公会': 70
  },
  {
    item: '在线时长',
    '个人': 50,
    '公会': 60
  },
  {
    item: '贡献度',
    '个人': 40,
    '公会': 50
  },
  {
    item: 'PVP',
    '个人': 60,
    '公会': 70
  },
  {
    item: 'PVE',
    '个人': 70,
    '公会': 50
  }
  ])
}

Mock.mock(/\/service/, 'get', serverList)
Mock.mock(/\/list\/search\/projects/, 'get', projects)
Mock.mock(/\/workplace\/activity/, 'get', activity)
Mock.mock(/\/workplace\/teams/, 'get', teams)
Mock.mock(/\/workplace\/radar/, 'get', radar)
