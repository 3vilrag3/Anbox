let host = 'https://www.ylys.tv';
let headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Referer": host + "/"
};

async function init(cfg) {}

/**
 * 通用解析：不做过滤，不做干扰
 */
function getList(html) {
    let videos = [];
    let items = pdfa(html, ".module-item,.module-card-item");
    items.forEach(it => {
        let idMatch = it.match(/detail\/(\d+)/);
        let nameMatch = it.match(/title="(.*?)"/) || it.match(/<strong>(.*?)<\/strong>/);
        let picMatch = it.match(/data-original="(.*?)"/) || it.match(/src="(.*?)"/);
        
        if (idMatch && nameMatch) {
            let pic = picMatch ? (picMatch[1] || picMatch[2]) : "";
            videos.push({
                "vod_id": idMatch[1],
                "vod_name": nameMatch[1].replace(/<.*?>/g, ""),
                "vod_pic": pic.startsWith('/') ? host + pic : pic,
                "vod_remarks": (it.match(/module-item-note">(.*?)<\/div>/) || ["",""])[1].replace(/<.*?>/g, "")
            });
        }
    });
    return videos;
}

async function home(filter) {
    return JSON.stringify({
        "class": [
            {"type_id":"1","type_name":"电影"},
            {"type_id":"2","type_name":"剧集"},
            {"type_id":"3","type_name":"综艺"},
            {"type_id":"4","type_name":"动漫"}
        ],
        "电影": [
                { key: "class", name: "类型", value: [ {n:"全部",v:""}, {n:"动作片",v:"动作片"}, {n:"喜剧片",v:"喜剧片"}, {n:"爱情片",v:"爱情片"}, {n:"科幻片",v:"科幻片"}, {n:"奇幻片",v:"奇幻片"}, {n:"恐怖片",v:"恐怖片"}, {n:"剧情片",v:"剧情片}, {n:"战争片",v:"战争片"}, {n:"纪录片",v:"纪录片"}, {n:"动画片",v:"动画片"}, {n:"悬疑片",v:"悬疑片"}, {n:"冒险片",v:"冒险片"}, {n:"犯罪片",v:"犯罪片"}, {n:"惊悚片",v:"惊悚片"}, {n:"歌舞片",v:"歌舞片"}, {n:"灾难片",v:"灾难片"}, {n:"网络片",v:"网络片"} ] },
                { key: "area", name: "地区", value: [ {n:"全部",v:""}, {n:"大陆",v:"大陆"}, {n:"香港",v:"香港"}, {n:"台湾",v:"台湾"}, {n:"美国",v:"美国"}, {n:"日本",v:"日本"}, {n:"韩国",v:"韩国"}, {n:"德国",v:"德国"}, {n:"泰国",v:"泰国"}, {n:"印度",v:"印度"}, {n:"意大利",v:"意大利"}, {n:"西班牙",v:"西班牙"}, {n:"加拿大",v:"加拿大"}, {n:"其他",v:"其他"} ] },
                { key: "year", name: "年份", value: [ {n:"全部",v:""}, {n:"2026",v:"2026"}, {n:"2025",v:"2025"}, {n:"2024",v:"2024"}, {n:"2023",v:"2023"}, {n:"2022",v:"2022"}, {n:"2021",v:"2021"}, {n:"2020",v:"2020"}, {n:"2019",v:"2019"}, {n:"2018",v:"2018"}, {n:"2017",v:"2017"}, {n:"2016",v:"2016"}, {n:"2015",v:"2015"}, {n:"2014",v:"2014"}, {n:"2013",v:"2013"}, {n:"2012",v:"2012"}, {n:"2011",v:"2011"}, {n:"更早",v:"更早"} ] },
                { key: "sort", name: "排序", value: [ {n:"添加时间",v:"添加时间"}, {n:"更新时间",v:"更新时间"}, {n:"人气排序",v:"人气排序"}, {n:"评分排序",v:"评分排序"} ] } 
        ],
        "剧集": [
                { key: "class", name: "类型", value: [ {n:"全部",v:""}, {n:"国产剧",v:"国产剧"}, {n:"港台剧",v:"港台剧"}, {n:"日剧",v:"日剧"}, {n:"韩剧",v:"韩剧"}, {n:"欧美剧",v:"欧美剧"}, {n:"泰剧",v:"泰剧"}, {n:"新马剧",v:"新马剧"}, {n:"其他剧",v:"其他剧"} ] },
                { key: "area", name: "地区", value: [ {n:"全部",v:""}, {n:"大陆",v:"大陆"}, {n:"香港",v:"香港"}, {n:"台湾",v:"台湾"}, {n:"美国",v:"美国"}, {n:"法国",v:"法国"}, {n:"英国",v:"英国"}, {n:"日本",v:"日本"}, {n:"韩国",v:"韩国"}, {n:"德国",v:"德国"}, {n:"泰国",v:"泰国"}, {n:"印度",v:"印度"}, {n:"意大利",v:"意大利"}, {n:"西班牙",v:"西班牙"}, {n:"加拿大",v:"加拿大"}, {n:"其他",v:"其他"} ] },
                { key: "year", name: "年份", value: [ {n:"全部",v:""}, {n:"2026",v:"2026"}, {n:"2025",v:"2025"}, {n:"2024",v:"2024"}, {n:"2023",v:"2023"}, {n:"2022",v:"2022"}, {n:"2021",v:"2021"}, {n:"2020",v:"2020"}, {n:"2019",v:"2019"}, {n:"2018",v:"2018"}, {n:"2017",v:"2017"}, {n:"2016",v:"2016"}, {n:"2015",v:"2015"}, {n:"2014",v:"2014"}, {n:"2013",v:"2013"}, {n:"2012",v:"2012"}, {n:"2011",v:"2011"}, {n:"2010-2000",v:"2010-2000"}, {n:"90年代",v:"90年代"}, {n:"80年代",v:"80年代"}, {n:"更早",v:"更早"},
                { key: "sort", name: "排序", value: [ {n:"添加时间",v:"添加时间"}, {n:"更新时间",v:"更新时间"}, {n:"人气排序",v:"人气排序"}, {n:"评分排序",v:"评分排序"} ] } 
        ],
        "综艺": [
                { key: "class", name: "类型", value: [ {n:"全部",v:""}, {n:"内地综艺",v:"内地综艺"}, {n:"港台综艺",v:"港台综艺"}, {n:"日本综艺",v:"日本综艺"}, {n:"韩国综艺",v:"韩国综艺"}, {n:"欧美综艺",v:"欧美综艺"}, {n:"新马泰综艺",v:"新马泰综艺"}, {n:"其他综艺",v:"其他综艺"} ] },
                { key: "area", name: "地区", value: [ {n:"全部",v:""}, {n:"内地",v:"内地"}, {n:"港台",v:"港台"}, {n:"日韩",v:"日韩"}, {n:"欧美",v:"欧美"} ] },
                { key: "year", name: "年份", value: [ {n:"全部",v:""}, {n:"2026",v:"2026"}, {n:"2025",v:"2025"}, {n:"2024",v:"2024"}, {n:"2023",v:"2023"}, {n:"2022",v:"2022"}, {n:"2021",v:"2021"}, {n:"2020",v:"2020"}, {n:"2019",v:"2019"}, {n:"2018",v:"2018"}, {n:"2017",v:"2017"}, {n:"2016",v:"2016"}, {n:"2015",v:"2015"}, {n:"2014",v:"2014"}, {n:"2013",v:"2013"}, {n:"2012",v:"2012"}, {n:"2011",v:"2011"}, {n:"2010-2000",v:"2010-2000"}, {n:"90年代",v:"90年代"}, {n:"80年代",v:"80年代"}, {n:"更早",v:"更早"},
                { key: "sort", name: "排序", value: [ {n:"添加时间",v:"添加时间"}, {n:"更新时间",v:"更新时间"}, {n:"人气排序",v:"人气排序"}, {n:"评分排序",v:"评分排序"} ] }         
        ],
        "动漫": [
                { key: "class", name: "类型", value: [ {n:"全部",v:""}, {n:"国产动漫",v:"国产动漫"}, {n:"日本动漫",v:"日本动漫"}, {n:"韩国动漫",v:"韩国动漫"}, {n:"港台动漫",v:"港台动漫"}, {n:"新马泰动漫",v:"新马泰动漫"}, {n:"欧美动漫",v:"欧美动漫"}, {n:"其他动漫",v:"其他动漫"} ] },
                { key: "area", name: "地区", value: [ {n:"全部",v:""}, {n:"大陆",v:"大陆"}, {n:"日本",v:"日本"}, {n:"欧美",v:"欧美"} ] },
                { key: "year", name: "年份", value: [ {n:"全部",v:""}, {n:"2026",v:"2026"}, {n:"2025",v:"2025"}, {n:"2024",v:"2024"}, {n:"2023",v:"2023"}, {n:"2022",v:"2022"}, {n:"2021",v:"2021"}, {n:"2020",v:"2020"}, {n:"2019",v:"2019"}, {n:"2018",v:"2018"}, {n:"2017",v:"2017"}, {n:"2016",v:"2016"}, {n:"2015",v:"2015"}, {n:"2014",v:"2014"}, {n:"2013",v:"2013"}, {n:"2012",v:"2012"}, {n:"2011",v:"2011"}, {n:"2010-2000",v:"2010-2000"}, {n:"90年代",v:"90年代"}, {n:"80年代",v:"80年代"}, {n:"更早",v:"更早"},
                { key: "sort", name: "排序", value: [ {n:"添加时间",v:"添加时间"}, {n:"更新时间",v:"更新时间"}, {n:"人气排序",v:"人气排序"}, {n:"评分排序",v:"评分排序"} ] }
    
             ]
        }
    });
}

async function homeVod() {
    let resp = await req(host, { headers: headers });
    return JSON.stringify({ list: getList(resp.content) });
}

async function category(tid, pg, filter, extend) {
    let p = pg || 1;
    let targetId = (extend && extend.class) ? extend.class : tid;
    let url = host + "/vodtype/" + targetId + "/" + (parseInt(p) > 1 ? "page/" + p + "/" : "");
    let resp = await req(url, { headers: headers });
    return JSON.stringify({ 
        "list": getList(resp.content), 
        "page": parseInt(p) 
    });
}

async function detail(id) {
    let url = host + '/voddetail/' + id + '/';
    let resp = await req(url, { headers: headers });
    let html = resp.content;
    
    let playFrom = pdfa(html, ".module-tab-item").map(it => (it.match(/<span>(.*?)<\/span>/) || ["","线路"])[1]).join('$$$');
    let playUrl = pdfa(html, ".module-play-list-content").map(list => 
        pdfa(list, "a").map(a => {
            let n = (a.match(/<span>(.*?)<\/span>/) || ["","播放"])[1];
            let v = a.match(/href="\/play\/(.*?)\/"/);
            return n + '$' + (v ? v[1] : "");
        }).join('#')
    ).join('$$$');
    
    return JSON.stringify({
        list: [{
            'vod_id': id,
            'vod_name': (html.match(/<h1>(.*?)<\/h1>/) || ["", ""])[1],
            'vod_pic': (html.match(/data-original="(.*?)"/) || ["", ""])[1],
            'vod_content': (html.match(/introduction-content">.*?<p>(.*?)<\/p>/s) || ["", ""])[1].replace(/<.*?>/g, ""),
            'vod_play_from': playFrom,
            'vod_play_url': playUrl
        }]
    });
}

async function search(wd, quick, pg) {
    let p = pg || 1;
    let url = host + "/vodsearch/" + encodeURIComponent(wd) + "-------------/" + (parseInt(p) > 1 ? "page/" + p + "/" : "");
    let resp = await req(url, { headers: headers });
    return JSON.stringify({ list: getList(resp.content) });
}

async function play(flag, id, flags) {
    let url = host + "/play/" + id + "/";
    let resp = await req(url, { headers: headers });
    let m3u8 = resp.content.match(/"url":"([^"]+\.m3u8)"/);
    if (m3u8) return JSON.stringify({ parse: 0, url: m3u8[1].replace(/\\/g, ""), header: headers });
    return JSON.stringify({ parse: 1, url: url, header: headers });
}

export default { init, home, homeVod, category, detail, search, play };
