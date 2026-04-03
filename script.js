// 等待DOM加载完成
window.onload = function() {
    // 初始化地图
    initMap();
};

function initMap() {
    // 创建地图实例
    var map = new AMap.Map('map-container', {
        zoom: 9,
        center: [121.5, 30.5], // 上海和四明山之间的中心位置
        resizeEnable: true
    });

    // 添加控件
    map.addControl(new AMap.ToolBar({
        position: 'RB'
    }));

    map.addControl(new AMap.Scale({
        position: 'RB'
    }));

    // 定义路线点
    var routePoints = [
        {
            name: '上海浦东',
            position: [121.507699, 31.222771],
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            type: 'start'
        },
        {
            name: '杭州湾跨海大桥',
            position: [121.175000, 30.466667],
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_y.png',
            type: 'waypoint'
        },
        {
            name: '四明山国家森林公园',
            position: [121.070000, 29.680000],
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_g.png',
            type: 'destination'
        },
        {
            name: '四明山观景台',
            position: [121.050000, 29.670000],
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_g.png',
            type: 'destination'
        },
        {
            name: '四明湖',
            position: [121.030000, 29.700000],
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_g.png',
            type: 'destination'
        }
    ];

    // 添加标记点
    routePoints.forEach(function(point) {
        var marker = new AMap.Marker({
            position: point.position,
            title: point.name,
            icon: point.icon,
            map: map
        });

        // 添加信息窗口
        var infoWindow = new AMap.InfoWindow({
            content: '<div style="padding: 10px;"><h3>' + point.name + '</h3></div>',
            offset: new AMap.Pixel(0, -30)
        });

        marker.on('click', function() {
            infoWindow.open(map, point.position);
        });
    });

    // 定义自驾路线
    var drivingRoute = [
        [121.507699, 31.222771], // 上海浦东
        [121.175000, 30.466667], // 杭州湾跨海大桥
        [121.070000, 29.680000], // 四明山国家森林公园
        [121.050000, 29.670000], // 四明山观景台
        [121.030000, 29.700000], // 四明湖
        [121.507699, 31.222771]  // 上海浦东（返程）
    ];

    // 绘制路线
    var polyline = new AMap.Polyline({
        path: drivingRoute,
        strokeColor: '#3498db',
        strokeWeight: 4,
        strokeOpacity: 0.8,
        strokeStyle: 'solid',
        map: map
    });

    // 添加路线说明
    var routeLabel = new AMap.Marker({
        position: [121.3, 30.0],
        content: '<div style="background-color: #3498db; color: white; padding: 5px 10px; border-radius: 4px;">上海浦东 → 四明山自驾路线</div>',
        offset: new AMap.Pixel(-70, 0),
        map: map
    });

    // 调整地图视野
    map.setFitView();
}

// 添加页面滚动动画
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 为卡片添加鼠标悬停效果
    var cards = document.querySelectorAll('.attraction-card, .food-card, .info-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        });
    });

    // 添加表格行悬停效果
    var tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f9f9f9';
        });
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });

    // 日期选择效果
    var dateOptions = document.querySelectorAll('.date-option');
    dateOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除所有选中状态
            dateOptions.forEach(opt => {
                opt.style.background = 'rgba(255,255,255,0.1)';
            });
            // 添加当前选中状态
            this.style.background = 'rgba(255,255,255,0.2)';
        });
    });
});