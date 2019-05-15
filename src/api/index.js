
import request from 'src/utils/request'

// 配置
request.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error)
  }
);
// 请求响应再一次过滤
request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default {
  // 树形机构列表
  getOrjTree(params) {
    return request({
      // url: '/projects/directoryTree',
      url: '/projects/tree',
      method: 'GET',
      params: params
    })
  },
  /* 统计 */
  // 统计总报警数,已处置数,已关闭数
  getAlarmStatistics(params) {
    return request({
      url: '/statistics/measalert',
      method: 'GET',
      params: params
    })
  },
  // 统计未及时测量点
  getMeasPointTimeliness(params) {
    return request({
      url: '/statistics/timeliness',
      method: 'GET',
      params: params
    })
  },
  // 当日上传数据量
  getDayUploadStatistics(params) {
    return request({
      url: '/statistics/uploadstat',
      method: 'GET',
      params: params
    })
  },
  // 统计图表
  getAlertCountStatistics(params) {
    return request({
      url: '/statistics/alertCount',
      method: 'GET',
      params: params
    })
  },
  // 工作考核
  getStatisticsWorkAssessment(params) {
    return request({
      url: '/statistics/workAssessment',
      method: 'GET',
      params: params
    })
  },

  /* 报警 */
  // 处置信息以及处置文件上传
  alertHandlesURL() {
    return request.defaults.baseURL + '/alerts/upload';
  },
  // 处置信息以及处置文件上传
  alertHandles(params) {
    return request({
      url: '/alerts/upload',
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // },
      method: 'POST',
      data: params
    })
  },
  // 获取报警详情
  getAlertDetail(params) {
    return request({
      url: '/alerts/' + params.id,
      method: 'GET'
    })
  },

  /* 报警规则 */
  // 报警清单列表
  getAlertList(params) {
    return request({
      url: '/alerts',
      method: 'GET',
      params: params
    })
  },
  // 获取树以及相关模板
  getRuleTree(params) {
    return request({
      url: '/ruleTemplates/getTree',
      method: 'GET',
      params: params
    })
  },
  // 获取模板列表
  getALertRuleModuleList(params) {
    return request({
      url: '/ruleTemplates/templates',
      method: 'GET',
      params: params
    })
  },
  // 工点断面测点绑定模板
  addRuleMapping(params) {
    return request({
      url: '/ruleTemplates/templates/mapping',
      method: 'POST',
      data: params
    })
  },
  // 工点断面测点绑定模板
  upRuleMapping(params) {
    return request({
      url: '/ruleTemplates/templates/mapping/' + params.rule_mapid,
      method: 'PUT',
      data: params
    })
  },
  // 新建模板并新建rule或新建模板
  addRuleTemplate(params) {
    return request({
      url:'/ruleTemplates/templates',
      method: 'POST',
      data: params
    })
  },
  // 获取模板规则详情
  getALertRuleModuleDetail(params) {
    return request({
      url:'/ruleTemplates/templates/' + params,
      method: 'GET'
    })
  },
  // 删除模板
  deleteRuleModule(params) {
    return request({
      url:'/ruleTemplates/templates/' + params,
      method: 'DELETE'
    })
  },
  // 更新模板
  editRuleModule(params) {
    return request({
      url:'/ruleTemplates/templates/' + params.rule_template_id,
      method: 'PUT',
      data: params
    })
  },

  /* 断面 */
  // 断面测点列表
  getCsecList(params) {
    return request({
      url: '/section',
      method: 'GET',
      params: params
    })
  },
  // 获取最近测量日期
  findDate(params) {
    return request({
      url: '/reports/findMaxSurveyTime',
      method: 'GET',
      params: params
    })
  },
  // 报表导出获取断面列表
  getExportCsecList(params) {
    return request({
      url: '/reports/crossSectionList',
      method: 'GET',
      params: params
    })
  },
  // 月报
  exportMonthReport(params) {
    return request({
      url: '/reports/month',
      method: 'POST',
      data: params
    })
  },
  // 周报
  exportWeeklyReport(params) {
    return request({
      url: '/reports/month',
      method: 'POST',
      data: params
    })
  },
  // 日报
  exportDailyReport(params) {
    return request({
      url: '/reports/daily',
      method: 'POST',
      data: params
    })
  },
  // 工作考核
  getWorkAssessmentList(params) {
    return request({
      url: '/statistics/workAssessment',
      method: 'GET',
      params: params
    })
  },
  // 获取断面详情
  getCsecDetail(params) {
    return request({
      url: '/section/' + params.id,
      method: 'GET'
    })
  },
  // 断面详情-变形曲线
  getDeformedCurve(params) {
    let da = {
      url: '/section/getDeformedCurve',
      method: 'GET',
      params: params.data
    };
    if (params['headers']) {
      da['headers'] = params['headers'];
    }
    return request(da)
  },
  // 获取回归公式
  getFunctions(params) {
    return request({
      url: '/section/getRegressionCurve',
      method: 'GET',
      params: params
    })
  },
  // 获取测量结果数据
  getSurveyData(params) {
    let da = {
      url: '/twylcrssurveydetailfact/',
      method: 'GET',
      params: params.data
    };
    if (params['headers']) {
      da['headers'] = params['headers'];
    }
    return request(da)
  },
  // 获取报警记录
  getTwylcrsalerts(params) {
    return request({
      url: '/twylcrsalert/',
      method: 'GET',
      params: params.data
    })
  },
  // xxxxx
  mmm(params) {
    return request({
      url: '',
      method: 'GET',
      params: params
    })
  }
}
