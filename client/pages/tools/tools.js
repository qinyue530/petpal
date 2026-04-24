// 工具助手页面逻辑
Page({
  data: {
    activeTool: null,
    petTypes: ['狗狗', '猫咪'],
    petTypeIndex: 0,
    petAge: '',
    result: null,
    trainingCourses: [
      { id: 1, title: '基础服从训练', description: '教授宠物基本的指令，如坐下、握手、趴下等', steps: ['准备零食作为奖励', '发出"坐下"指令', '轻按宠物臀部', '完成后给予奖励'] },
      { id: 2, title: '如厕训练', description: '帮助宠物养成良好的如厕习惯', steps: ['固定如厕地点', '观察宠物行为', '定时带去如厕', '成功后给予表扬'] },
      { id: 3, title: '行为纠正训练', description: '纠正宠物的不良行为，如咬人、吠叫等', steps: ['识别不良行为', '及时制止并说"不"', '引导正确行为', '奖励正确行为'] }
    ],
    healthSymptoms: [
      { id: 1, symptom: '食欲不振', advice: '可能是消化不良或生病，建议观察1-2天，若持续请就医' },
      { id: 2, symptom: '呕吐', advice: '偶尔呕吐可能是吃太快，频繁呕吐请立即就医' },
      { id: 3, symptom: '腹泻', advice: '注意补充水分，禁食12小时后喂清淡食物，严重请就医' },
      { id: 4, symptom: '精神不振', advice: '可能是生病或环境变化，建议观察其他症状并就医' }
    ],
    vaccines: [],
    showCourseDetail: false,
    currentCourse: null,
    showSymptomResult: false,
    currentSymptom: null,
    newVaccineName: '',
    newVaccineDate: ''
  },
  
  onLoad: function() {
    console.log('工具助手页面加载');
    this.loadVaccines();
  },
  
  onShow: function() {
    console.log('工具助手页面显示');
    this.loadVaccines();
  },
  
  loadVaccines: function() {
    const vaccines = wx.getStorageSync('vaccines') || [
      { id: 1, name: '狂犬疫苗', date: '2026-06-15', status: '待接种' },
      { id: 2, name: '犬瘟热疫苗', date: '2026-07-20', status: '待接种' }
    ];
    this.setData({ vaccines });
  },
  
  // 显示工具
  showCalculator: function() { this.setData({ activeTool: 'calculator' }); },
  showTraining: function() { this.setData({ activeTool: 'training', showCourseDetail: false }); },
  showHealth: function() { this.setData({ activeTool: 'health', showSymptomResult: false }); },
  showVaccine: function() { this.setData({ activeTool: 'vaccine' }); },
  
  // 选择宠物类型
  bindPickerChange: function(e) { this.setData({ petTypeIndex: e.detail.value }); },
  
  // 输入宠物年龄
  inputPetAge: function(e) { this.setData({ petAge: e.detail.value }); },
  
  // 计算人类年龄
  calculateAge: function() {
    const age = parseInt(this.data.petAge);
    if (!age || age < 0) {
      wx.showToast({ title: '请输入有效年龄', icon: 'none' });
      return;
    }
    // 狗狗: 第1年=15岁，第2年=9岁，之后每年=5岁
    // 猫咪: 第1年=15岁，第2年=10岁，之后每年=4岁
    let humanAge;
    if (this.data.petTypeIndex === 0) { // 狗狗
      if (age === 1) humanAge = 15;
      else if (age === 2) humanAge = 24;
      else humanAge = 24 + (age - 2) * 5;
    } else { // 猫咪
      if (age === 1) humanAge = 15;
      else if (age === 2) humanAge = 25;
      else humanAge = 25 + (age - 2) * 4;
    }
    this.setData({ result: humanAge });
  },
  
  // 查看教程详情
  viewCourse: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ 
      showCourseDetail: true, 
      currentCourse: this.data.trainingCourses[index] 
    });
  },
  
  // 关闭教程详情
  closeCourseDetail: function() {
    this.setData({ showCourseDetail: false });
  },
  
  // 自查症状
  checkSymptom: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ 
      showSymptomResult: true, 
      currentSymptom: this.data.healthSymptoms[index] 
    });
  },
  
  // 关闭症状结果
  closeSymptomResult: function() {
    this.setData({ showSymptomResult: false });
  },
  
  // 输入疫苗名称
  inputVaccineName: function(e) { this.setData({ newVaccineName: e.detail.value }); },
  
  // 选择疫苗日期
  inputVaccineDate: function(e) { this.setData({ newVaccineDate: e.detail.value }); },
  
  // 添加疫苗提醒
  addVaccine: function() {
    if (!this.data.newVaccineName || !this.data.newVaccineDate) {
      wx.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }
    const vaccines = this.data.vaccines;
    vaccines.push({
      id: Date.now(),
      name: this.data.newVaccineName,
      date: this.data.newVaccineDate,
      status: '待接种'
    });
    wx.setStorageSync('vaccines', vaccines);
    this.setData({ 
      vaccines, 
      newVaccineName: '', 
      newVaccineDate: '' 
    });
    wx.showToast({ title: '添加成功', icon: 'success' });
  },
  
  // 标记疫苗已接种
  completeVaccine: function(e) {
    const index = e.currentTarget.dataset.index;
    const vaccines = this.data.vaccines;
    vaccines[index].status = '已接种';
    wx.setStorageSync('vaccines', vaccines);
    this.setData({ vaccines });
    wx.showToast({ title: '已标记完成', icon: 'success' });
  },
  
  // 删除疫苗
  deleteVaccine: function(e) {
    const index = e.currentTarget.dataset.index;
    const vaccines = this.data.vaccines;
    vaccines.splice(index, 1);
    wx.setStorageSync('vaccines', vaccines);
    this.setData({ vaccines });
    wx.showToast({ title: '已删除', icon: 'success' });
  }
});