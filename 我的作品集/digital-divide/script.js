document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initScrollAnimations();
  initBookButtons();
  initCharts();
  initSolutionTabs();
  initQuiz();
  initAdvocacyCard();
  initModals();
});

function initNavigation() {
  var navDots = document.querySelectorAll('.nav-dot');
  var sections = document.querySelectorAll('.section');

  navDots.forEach(function(dot) {
    dot.addEventListener('click', function(e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      var targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  window.addEventListener('scroll', function() {
    var scrollPos = window.scrollY + window.innerHeight / 2;
    
    sections.forEach(function(section, index) {
      var sectionTop = section.offsetTop;
      var sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        navDots.forEach(function(dot) { dot.classList.remove('active'); });
        if (navDots[index]) navDots[index].classList.add('active');
      }
    });
  });
}

function initScrollAnimations() {
  var headers = document.querySelectorAll('.section-header');
  
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });

  headers.forEach(function(header) { observer.observe(header); });
}

function initBookButtons() {
  var bookBtns = document.querySelectorAll('.book-btn');
  var failModal = document.getElementById('failModal');
  var failReason = document.getElementById('failReason');
  var closeModal = document.getElementById('closeModal');

  bookBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var doctor = this.getAttribute('data-doctor');
      var available = this.getAttribute('data-available') === 'true';
      
      if (!available) {
        failReason.textContent = '抱歉，' + doctor + '医生的号源已约满';
      } else {
        var reasons = [
          '验证码验证失败，请重新输入',
          '网络连接超时，请稍后重试',
          '账号未实名认证，请先完成认证',
          '系统繁忙，请稍后再试',
          '号源已被抢订，请选择其他时间'
        ];
        failReason.textContent = reasons[Math.floor(Math.random() * reasons.length)];
      }
      
      failModal.classList.add('active');
    });
  });

  closeModal.addEventListener('click', function() {
    failModal.classList.remove('active');
  });

  failModal.addEventListener('click', function(e) {
    if (e.target === failModal) {
      failModal.classList.remove('active');
    }
  });
}

function initCharts() {
  initHeatmapChart();
  initEmotionChart();
  initRadarChart();
  initSankeyChart();
  initWordCloudChart();
  initCompareChart();
}

function initHeatmapChart() {
  var chartDom = document.getElementById('heatmapChart');
  if (!chartDom) return;
  
  var myChart = echarts.init(chartDom);
  
  var hours = ['首页', '科室选择', '医生列表', '挂号按钮', '验证码', '支付'];
  var days = ['第一次尝试', '第二次尝试', '第三次尝试'];
  
  var data = [
    [0, 0, 10], [1, 0, 25], [2, 0, 35], [3, 0, 15], [4, 0, 10], [5, 0, 5],
    [0, 1, 15], [1, 1, 30], [2, 1, 40], [3, 1, 25], [4, 1, 20], [5, 1, 10],
    [0, 2, 20], [1, 2, 35], [2, 2, 45], [3, 2, 35], [4, 2, 30], [5, 2, 20]
  ];

  var option = {
    tooltip: {
      position: 'top',
      formatter: function(params) {
        return days[params.value[1]] + '<br>' + hours[params.value[0]] + ': 操作次数 ' + params.value[2];
      }
    },
    grid: {
      left: '15%',
      right: '5%',
      top: '10%',
      bottom: '15%'
    },
    xAxis: {
      type: 'category',
      data: hours,
      axisLabel: { fontSize: 11, color: '#718096' },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'category',
      data: days,
      axisLabel: { fontSize: 11, color: '#718096' },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    visualMap: {
      min: 0,
      max: 50,
      show: false,
      inRange: { color: ['#bee3f8', '#fbd38d', '#fc8181', '#e53e3e'] }
    },
    series: [{
      type: 'heatmap',
      data: data,
      label: { show: true, fontSize: 11, color: '#1a202c' },
      itemStyle: { borderRadius: 4, borderWidth: 2, borderColor: '#fff' }
    }]
  };

  myChart.setOption(option);
  
  window.addEventListener('resize', function() { myChart.resize(); });
}

function initEmotionChart() {
  var chartDom = document.getElementById('emotionChart');
  if (!chartDom) return;
  
  var myChart = echarts.init(chartDom);

  var option = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    grid: { left: '3%', right: '4%', top: '15%', bottom: '3%', containLabel: true },
    legend: {
      data: ['情绪指数', '挫败感'],
      top: 0,
      textStyle: { fontSize: 12, color: '#718096' }
    },
    xAxis: {
      type: 'category',
      data: ['打开APP', '找科室', '选医生', '点挂号', '输验证', '支付'],
      axisLabel: { fontSize: 11, color: '#718096' },
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: { fontSize: 11, color: '#718096' },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#edf2f7' } }
    },
    series: [
      {
        name: '情绪指数',
        type: 'line',
        data: [75, 65, 55, 45, 25, 15],
        smooth: true,
        lineStyle: { width: 3, color: '#4299e1' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(66, 153, 225, 0.3)' },
            { offset: 1, color: 'rgba(66, 153, 225, 0.05)' }
          ])
        },
        itemStyle: { color: '#4299e1' }
      },
      {
        name: '挫败感',
        type: 'line',
        data: [10, 20, 35, 50, 75, 90],
        smooth: true,
        lineStyle: { width: 3, color: '#f56565' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(245, 101, 101, 0.3)' },
            { offset: 1, color: 'rgba(245, 101, 101, 0.05)' }
          ])
        },
        itemStyle: { color: '#f56565' }
      }
    ]
  };

  myChart.setOption(option);
  
  window.addEventListener('resize', function() { myChart.resize(); });
}

function initRadarChart() {
  var chartDom = document.getElementById('radarChart');
  if (!chartDom) return;
  
  var myChart = echarts.init(chartDom);

  var option = {
    tooltip: {},
    legend: {
      data: ['当前水平', '目标水平'],
      bottom: 0,
      textStyle: { fontSize: 12, color: '#718096' }
    },
    radar: {
      indicator: [
        { name: '医疗服务', max: 100 },
        { name: '政务服务', max: 100 },
        { name: '金融服务', max: 100 },
        { name: '交通出行', max: 100 },
        { name: '生活缴费', max: 100 },
        { name: '社交沟通', max: 100 }
      ],
      center: ['50%', '50%'],
      radius: '65%',
      splitNumber: 4,
      axisName: { color: '#4a5568', fontSize: 12 },
      splitLine: { lineStyle: { color: '#e2e8f0' } },
      splitArea: {
        show: true,
        areaStyle: { color: ['rgba(247, 250, 252, 0.5)', 'rgba(237, 242, 247, 0.3)'] }
      },
      axisLine: { lineStyle: { color: '#e2e8f0' } }
    },
    series: [{
      type: 'radar',
      data: [
        {
          value: [20, 35, 42, 38, 48, 58],
          name: '当前水平',
          itemStyle: { color: '#f56565' },
          areaStyle: { color: 'rgba(245, 101, 101, 0.2)' },
          lineStyle: { width: 2 }
        },
        {
          value: [85, 80, 85, 80, 90, 85],
          name: '目标水平',
          itemStyle: { color: '#48bb78' },
          areaStyle: { color: 'rgba(72, 187, 120, 0.15)' },
          lineStyle: { width: 2 }
        }
      ]
    }]
  };

  myChart.setOption(option);
  
  window.addEventListener('resize', function() { myChart.resize(); });
}

function initSankeyChart() {
  var chartDom = document.getElementById('sankeyChart');
  if (!chartDom) return;
  
  var myChart = echarts.init(chartDom);

  var option = {
    tooltip: { trigger: 'item', triggerOn: 'mousemove' },
    series: [{
      type: 'sankey',
      left: '5%',
      right: '15%',
      top: '5%',
      bottom: '5%',
      data: [
        { name: '老年人' },
        { name: '尝试使用' },
        { name: '放弃使用' },
        { name: '成功使用' },
        { name: '就医挂号' },
        { name: '生活缴费' },
        { name: '社交沟通' },
        { name: '求助子女' },
        { name: '线下办理' }
      ],
      links: [
        { source: '老年人', target: '尝试使用', value: 60 },
        { source: '老年人', target: '放弃使用', value: 40 },
        { source: '尝试使用', target: '成功使用', value: 25 },
        { source: '尝试使用', target: '求助子女', value: 20 },
        { source: '尝试使用', target: '线下办理', value: 15 },
        { source: '成功使用', target: '社交沟通', value: 12 },
        { source: '成功使用', target: '生活缴费', value: 8 },
        { source: '成功使用', target: '就医挂号', value: 5 },
        { source: '放弃使用', target: '线下办理', value: 40 }
      ],
      lineStyle: { color: 'gradient', curveness: 0.5, opacity: 0.6 },
      label: { fontSize: 11, color: '#4a5568' },
      itemStyle: { borderWidth: 0, borderColor: '#fff' },
      emphasis: { focus: 'adjacency' }
    }]
  };

  myChart.setOption(option);
  
  window.addEventListener('resize', function() { myChart.resize(); });
}

function initWordCloudChart() {
  var chartDom = document.getElementById('wordCloudChart');
  if (!chartDom) return;
  
  var myChart = echarts.init(chartDom);

  var words = [
    { name: '耐心', value: 100 },
    { name: '教不会', value: 90 },
    { name: '忘记了', value: 85 },
    { name: '学了又忘', value: 80 },
    { name: '视频通话', value: 75 },
    { name: '微信', value: 70 },
    { name: '字太小', value: 68 },
    { name: '太复杂', value: 65 },
    { name: '反复教', value: 60 },
    { name: '健康码', value: 58 },
    { name: '付款码', value: 55 },
    { name: '挂号', value: 50 },
    { name: '打车', value: 45 },
    { name: '缴费', value: 42 },
    { name: '拍照', value: 40 },
    { name: '导航', value: 38 },
    { name: '短视频', value: 35 },
    { name: '怕弄坏', value: 32 },
    { name: '骗子多', value: 30 },
    { name: '不敢点', value: 28 }
  ];

  var option = {
    tooltip: { show: true },
    series: [{
      type: 'graph',
      layout: 'force',
      force: { repulsion: 150, gravity: 0.05, edgeLength: [10, 50] },
      roam: false,
      label: {
        show: true,
        position: 'inside',
        formatter: '{b}',
        fontSize: function(params) {
          return Math.max(10, Math.min(24, params.value / 5));
        },
        fontWeight: 'bold',
        color: '#fff'
      },
      itemStyle: {
        color: function(params) {
          var colors = ['#2c5282', '#3182ce', '#4299e1', '#63b3ed', '#90cdf4', '#e53e3e', '#ed8936', '#d69e2e', '#38a169', '#805ad5'];
          return colors[params.dataIndex % colors.length];
        }
      },
      data: words.map(function(word) {
        return {
          name: word.name,
          value: word.value,
          symbolSize: Math.max(20, Math.min(60, word.value / 2.5))
        };
      }),
      links: []
    }]
  };

  myChart.setOption(option);
  
  window.addEventListener('resize', function() { myChart.resize(); });
}

function initCompareChart() {
  var chartDom = document.getElementById('compareChart');
  if (!chartDom) return;
  
  var myChart = echarts.init(chartDom);

  var categories = ['医疗服务', '政务办事', '金融服务', '交通出行', '生活缴费', '社交沟通'];

  var option = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: {
      data: ['改造前', '改造后'],
      top: 0,
      textStyle: { fontSize: 12, color: '#718096' }
    },
    grid: { left: '3%', right: '4%', top: '15%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: { fontSize: 11, color: '#718096' },
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLabel: { fontSize: 11, color: '#718096', formatter: '{value}%' },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#edf2f7' } }
    },
    series: [
      {
        name: '改造前',
        type: 'bar',
        data: [35, 28, 42, 38, 48, 55],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#fc8181' },
            { offset: 1, color: '#feb2b2' }
          ]),
          borderRadius: [4, 4, 0, 0]
        },
        barWidth: '30%'
      },
      {
        name: '改造后',
        type: 'bar',
        data: [78, 72, 80, 75, 85, 88],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#68d391' },
            { offset: 1, color: '#9ae6b4' }
          ]),
          borderRadius: [4, 4, 0, 0]
        },
        barWidth: '30%'
      }
    ]
  };

  myChart.setOption(option);
  
  window.addEventListener('resize', function() { myChart.resize(); });
}

function initSolutionTabs() {
  var tabs = document.querySelectorAll('.solution-tab');
  var panels = document.querySelectorAll('.solution-panel');

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      var targetTab = this.getAttribute('data-tab');
      
      tabs.forEach(function(t) { t.classList.remove('active'); });
      panels.forEach(function(p) { p.classList.remove('active'); });
      
      this.classList.add('active');
      var targetPanel = document.querySelector('.solution-panel[data-panel="' + targetTab + '"]');
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

function initQuiz() {
  var questions = document.querySelectorAll('.quiz-question');
  var result = document.getElementById('quizResult');
  var scoreValue = document.getElementById('scoreValue');
  var resultDesc = document.getElementById('resultDesc');
  var restartBtn = document.getElementById('quizRestart');
  
  var currentQuestion = 0;
  var totalScore = 0;

  questions.forEach(function(question, qIndex) {
    var options = question.querySelectorAll('.quiz-option');
    
    options.forEach(function(option) {
      option.addEventListener('click', function() {
        var score = parseInt(this.getAttribute('data-score'));
        totalScore += score;

        options.forEach(function(opt) { opt.classList.remove('selected'); });
        this.classList.add('selected');

        setTimeout(function() {
          questions[currentQuestion].classList.remove('active');
          currentQuestion++;

          if (currentQuestion < questions.length) {
            questions[currentQuestion].classList.add('active');
          } else {
            showResult();
          }
        }, 400);
      });
    });
  });

  function showResult() {
    var maxScore = 9;
    var percentage = Math.round((totalScore / maxScore) * 100);
    
    scoreValue.textContent = percentage;
    
    if (percentage >= 80) {
      resultDesc.textContent = '你是数字包容的先行者！感谢你对老年人的耐心与关爱。';
    } else if (percentage >= 60) {
      resultDesc.textContent = '你有不错的数字包容意识，试着再多一点点耐心吧~';
    } else if (percentage >= 40) {
      resultDesc.textContent = '你对数字鸿沟有所了解，让我们一起行动起来！';
    } else {
      resultDesc.textContent = '多关注身边的老年人吧，他们需要我们的帮助。';
    }
    
    result.classList.add('active');
    restartBtn.style.display = 'inline-block';
  }

  restartBtn.addEventListener('click', function() {
    currentQuestion = 0;
    totalScore = 0;
    
    result.classList.remove('active');
    restartBtn.style.display = 'none';
    
    questions.forEach(function(q) {
      q.classList.remove('active');
      q.querySelectorAll('.quiz-option').forEach(function(opt) { opt.classList.remove('selected'); });
    });
    
    questions[0].classList.add('active');
  });
}

function initAdvocacyCard() {
  var generateBtn = document.getElementById('generateBtn');
  var nameInput = document.getElementById('nameInput');
  var advocacyModal = document.getElementById('advocacyModal');
  var previewName = document.getElementById('previewName');
  var previewNumber = document.getElementById('previewNumber');
  var closeAdvocacy = document.getElementById('closeAdvocacyModal');
  var pledgeCount = document.getElementById('pledgeCount');

  generateBtn.addEventListener('click', function() {
    var name = nameInput.value.trim() || '匿名朋友';
    previewName.textContent = name;
    
    var num = Math.floor(Math.random() * 90000) + 10000;
    previewNumber.textContent = num;
    
    advocacyModal.classList.add('active');
    
    var currentCount = parseInt(pledgeCount.textContent.replace(/,/g, ''));
    pledgeCount.textContent = (currentCount + 1).toLocaleString();
  });

  closeAdvocacy.addEventListener('click', function() {
    advocacyModal.classList.remove('active');
  });

  advocacyModal.addEventListener('click', function(e) {
    if (e.target === advocacyModal) {
      advocacyModal.classList.remove('active');
    }
  });
}

function initModals() {
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      var activeModals = document.querySelectorAll('.modal-overlay.active');
      activeModals.forEach(function(modal) { modal.classList.remove('active'); });
    }
  });
}