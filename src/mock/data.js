/**
 * @fileoverview Mock 数据 —— 大运维大安全驾驶舱
 */

/** @type {string[]} 单位列表 */
const units = ['长沙市', '株洲市', '湘潭市', '衡阳市', '邵阳市', '岳阳市', '常德市', '张家界市', '益阳市', '郴州市', '永州市', '怀化市', '娄底市', '湘西州']

/** @type {string[]} 运维团队 */
const teams = ['网络运维组', '服务器运维组', '数据库运维组', '安全运维组', '应用运维组', '桌面运维组']

/* ====================== 1. 待接管情况 ====================== */
export const takeoverData = {
  summary: {
    pendingSystem: 156,
    pendingAsset: 3842,
    takenSystem: 1247,
    takenAsset: 28965
  },
  unitList: units.map(name => {
    const pending = Math.floor(Math.random() * 30) + 5
    const taken = Math.floor(Math.random() * 120) + 60
    return {
      name,
      pending,
      taken,
      rate: Math.round((taken / (taken + pending)) * 100)
    }
  })
}

/* ====================== 2. 风险管控 ====================== */
export const riskData = {
  summary: {
    highRisk: 18,
    midRisk: 45,
    lowRisk: 67,
    healthy: 1117
  },
  faults: [
    { id: 1, content: '核心交换机端口故障导致网络中断', status: '处理中' },
    { id: 2, content: '数据库主从同步延迟超阈值', status: '已恢复' },
    { id: 3, content: '存储阵列磁盘组降级告警', status: '处理中' },
    { id: 4, content: 'DNS 解析服务异常', status: '已恢复' },
    { id: 5, content: '负载均衡器健康检查失败', status: '待处理' }
  ],
  majorFaultCount: 5,
  changes: [
    { id: 1, content: '核心防火墙策略升级', status: '审批中' },
    { id: 2, content: '数据中心 UPS 电池更换', status: '已完成' },
    { id: 3, content: '主备数据库切换演练', status: '执行中' },
    { id: 4, content: '安全漏洞补丁批量更新', status: '待审批' }
  ],
  majorChangeCount: 4,
  statusWorkOrders: {
    high: { pending: 32, alert: 56 },
    mid: { pending: 68, alert: 89 },
    low: { pending: 45, alert: 34 },
    healthy: { pending: 12, alert: 8 }
  },
  unitRisk: units.map(name => ({
    name,
    high: Math.floor(Math.random() * 5),
    mid: Math.floor(Math.random() * 8) + 1,
    low: Math.floor(Math.random() * 12) + 2
  }))
}

/* ====================== 3. 资产治理 ====================== */
export const assetData = {
  summary: {
    expired: 223,
    nearExpiry: 178,
    floating: 112,
    pendingCount: 356,
    pendingRate: 69.2,
    processedCount: 157,
    processedRate: 30.8
  },
  unitList: units.map(name => ({
    name,
    expired: Math.floor(Math.random() * 30) + 5,
    nearExpiry: Math.floor(Math.random() * 25) + 3,
    floating: Math.floor(Math.random() * 15) + 1
  }))
}

/* ====================== 4. 人力效能 ====================== */
export const efficiencyData = {
  summary: {
    totalStaff: 359,
    onDuty: 312,
    onDutyRate: 86.9
  },
  teams: teams.map(name => ({
    name,
    total: Math.floor(Math.random() * 30) + 40,
    onDuty: Math.floor(Math.random() * 25) + 35,
    onDutyRate: Math.round(80 + Math.random() * 18),
    orderTotal: Math.floor(Math.random() * 500) + 200,
    orderCompleteRate: Math.round(75 + Math.random() * 23),
    orderAvgTime: (Math.random() * 3 + 0.5).toFixed(1),
    orderAvgResponse: (Math.random() * 30 + 5).toFixed(0),
    alertTotal: Math.floor(Math.random() * 300) + 100,
    alertRate: Math.round(70 + Math.random() * 28),
    alertAvgTime: (Math.random() * 2 + 0.3).toFixed(1)
  }))
}

/* ====================== 5. 工单运行 ====================== */
export const workOrderData = {
  summary: {
    total: 8555,
    completed: 7820,
    completedRate: 91.4,
    pending: 735,
    pendingRate: 8.6,
    avgProcessTime: 2.8,
    avgResponseTime: 12
  },
  levels: [
    { name: '紧急', count: 156, color: '#ff4757' },
    { name: '重要', count: 432, color: '#ff8c00' },
    { name: '一般', count: 3567, color: '#00e4ff' },
    { name: '低优', count: 4400, color: '#00ff88' }
  ],
  unitOrders: units.map(name => {
    const total = Math.floor(Math.random() * 800) + 200
    const completed = Math.floor(total * (0.8 + Math.random() * 0.18))
    return {
      name,
      total,
      completed,
      completedRate: Math.round((completed / total) * 100)
    }
  })
}

/* ====================== 6. 项目情况 ====================== */
export const projectData = {
  stage: {
    notStarted: 8,
    approval: 12,
    implementing: 35,
    completed: 28,
    maintaining: 3
  },
  types: [
    { name: '运维类', value: 32 },
    { name: '研发类', value: 24 },
    { name: '安全类', value: 16 },
    { name: '基础设施类', value: 14 }
  ],
  riskStatus: {
    normal: 62,
    warning: 16,
    overdue: 8
  },
  building: {
    total: 35,
    constructing: 22
  },
  unitProjects: units.map(name => ({
    name,
    notStarted: Math.floor(Math.random() * 3),
    implementing: Math.floor(Math.random() * 6) + 1,
    completed: Math.floor(Math.random() * 5) + 1
  }))
}
