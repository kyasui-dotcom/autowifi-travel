// Part 2: Add ~100 more spots to reach 500 — global chains, coworking, more airports, SE Asia
const fs = require('fs');
const path = require('path');

const patternsPath = path.join(__dirname, '..', 'mobile', 'assets', 'portal-patterns', 'patterns-v1.json');
const geofencePath = path.join(__dirname, '..', 'mobile', 'assets', 'portal-patterns', 'geofence-data.json');

const data = JSON.parse(fs.readFileSync(patternsPath, 'utf-8'));
const geoData = JSON.parse(fs.readFileSync(geofencePath, 'utf-8'));

function agreeOnly(extras = {}) {
  return {
    agreeOnly: {
      actions: [
        ...(extras.preCheck ? [{ description: 'Accept terms checkbox', selector: "input[type='checkbox']", fallbackSelectors: ['.terms-checkbox', '#agree', '.checkbox'], action: 'check', delayMs: 500 }] : []),
        { description: 'Click connect button', selector: "button[type='submit'], .btn-connect, .submit-btn, input[type='submit']", fallbackSelectors: ['button:last-of-type', 'a.btn', '.btn-primary'], action: 'click', delayMs: 500 },
      ],
      successCondition: { method: 'http_probe', value: 'http://connectivitycheck.gstatic.com/generate_204' },
    },
  };
}

function reg() {
  return {
    registration: {
      fields: [{ fieldId: 'email', selector: "input[name='email'], input[type='email']", fallbackSelectors: ["input[type='text']:first-of-type"], valueSource: 'profile.email', inputMethod: 'set_value', delayMs: 500 }],
      postFillActions: [
        { description: 'Accept terms', selector: "input[type='checkbox'], .terms-agree", fallbackSelectors: ['#agree', '.checkbox'], action: 'check', delayMs: 300 },
        { description: 'Submit', selector: "button[type='submit'], .connect-btn, input[type='submit']", fallbackSelectors: ['button:last-of-type', '.btn-primary'], action: 'click', delayMs: 500 },
      ],
      successCondition: { method: 'http_probe', value: 'http://connectivitycheck.gstatic.com/generate_204' },
    },
  };
}

function spot(id, name, ja, zh, ko, country, ssids, type, opts = {}) {
  return {
    spotId: id, name, nameJa: ja, nameZh: zh, nameKo: ko,
    ...(opts.airportCode ? { airportCode: opts.airportCode } : {}),
    country, ssids, portalType: type, tier: 'free',
    ...(type === 'agree_only' ? agreeOnly({ preCheck: opts.preCheck !== false }) : reg()),
    patternVersion: 1, lastVerified: '2026-03-10',
    notes: opts.notes || '',
  };
}

function geo(id, lat, lng, r) {
  return { spotId: id, latitude: lat, longitude: lng, radius: r, identifier: `geofence_${id}` };
}

const newSpots = [
  // ===== JAPAN — More tourist/public WiFi =====
  spot('jp-gifu-wifi', 'Gifu Free WiFi', '岐阜 Free WiFi', '岐阜免费WiFi', '기후 무료 WiFi', 'JP', ['GIFU_Free_Wi-Fi'], 'agree_only', { notes: 'Gifu city, Gifu Castle.' }),
  spot('jp-ise-wifi', 'Ise Free WiFi', '伊勢 Free WiFi', '伊势免费WiFi', '이세 무료 WiFi', 'JP', ['ISE_Free_Wi-Fi'], 'agree_only', { notes: 'Ise Jingu area, Oharai-machi.' }),
  spot('jp-nara-park-wifi', 'Nara Park WiFi', '奈良公園 WiFi', '奈良公园WiFi', '나라 공원 WiFi', 'JP', ['NARA_PARK_Wi-Fi'], 'agree_only', { notes: 'Nara Park and deer area.' }),
  spot('jp-kochi-wifi', 'Kochi Free WiFi', '高知 Free WiFi', '高知免费WiFi', '고치 무료 WiFi', 'JP', ['KOCHI_Free_Wi-Fi'], 'agree_only', { notes: 'Kochi city, Katsura-hama.' }),
  spot('jp-himeji-wifi', 'Himeji Free WiFi', '姫路 Free WiFi', '�的路免费WiFi', '히메지 무료 WiFi', 'JP', ['HIMEJI_Free_Wi-Fi'], 'agree_only', { notes: 'Himeji Castle area.' }),
  spot('jp-wakayama-wifi', 'Wakayama Free WiFi', '和歌山 Free WiFi', '和歌山免费WiFi', '와카야마 무료 WiFi', 'JP', ['WAKAYAMA_Free_Wi-Fi'], 'agree_only', { notes: 'Wakayama city, gateway to Koya-san.' }),
  spot('jp-otaru-wifi', 'Otaru Free WiFi', '小樽 Free WiFi', '小樽免费WiFi', '오타루 무료 WiFi', 'JP', ['OTARU_Free_Wi-Fi'], 'agree_only', { notes: 'Otaru Canal, historic town near Sapporo.' }),
  spot('jp-asahikawa-wifi', 'Asahikawa Free WiFi', '旭川 Free WiFi', '旭川免费WiFi', '아사히카와 무료 WiFi', 'JP', ['ASAHIKAWA_Free_Wi-Fi'], 'agree_only', { notes: 'Asahikawa, Hokkaido. Zoo, ramen.' }),
  spot('jp-obihiro-wifi', 'Obihiro Free WiFi', '帯広 Free WiFi', '带广免费WiFi', '오비히로 무료 WiFi', 'JP', ['OBIHIRO_Free_Wi-Fi'], 'agree_only', { notes: 'Obihiro, Tokachi area.' }),
  spot('jp-kushiro-wifi', 'Kushiro Free WiFi', '釧路 Free WiFi', '�的路免费WiFi', '구시로 무료 WiFi', 'JP', ['KUSHIRO_Free_Wi-Fi'], 'agree_only', { notes: 'Kushiro, Hokkaido. Marshlands.' }),
  spot('jp-nagano-wifi', 'Nagano Free WiFi', '長野 Free WiFi', '长野免费WiFi', '나가노 무료 WiFi', 'JP', ['NAGANO_Free_Wi-Fi'], 'agree_only', { notes: 'Nagano city, Zenkoji Temple.' }),
  spot('jp-utsunomiya-wifi', 'Utsunomiya Free WiFi', '宇都宮 Free WiFi', '宇都宫免费WiFi', '우츠노미야 무료 WiFi', 'JP', ['UTSUNOMIYA_Free_Wi-Fi'], 'agree_only', { notes: 'Utsunomiya, Tochigi. Gyoza capital.' }),
  // Japan — additional chains
  spot('jp-katsuya-wifi', 'Katsuya Free WiFi', 'かつや Free WiFi', 'Katsuya免费WiFi', '카츠야 무료 WiFi', 'JP', ['KATSUYA_Free_Wi-Fi'], 'agree_only', { notes: 'Tonkatsu fast food chain.' }),
  spot('jp-tenya-wifi', 'Tenya Free WiFi', '天丼てんや Free WiFi', '天丼Tenya免费WiFi', '텐야 무료 WiFi', 'JP', ['TENYA_Free_Wi-Fi'], 'agree_only', { notes: 'Tempura bowl chain.' }),
  spot('jp-torikizoku-wifi', 'Torikizoku Free WiFi', '鳥貴族 Free WiFi', '�的贵族免费WiFi', '토리키조쿠 무료 WiFi', 'JP', ['TORIKIZOKU_Free_Wi-Fi'], 'agree_only', { notes: 'Yakitori izakaya chain.' }),
  spot('jp-sushiro-wifi', 'Sushiro Free WiFi', 'スシロー Free WiFi', '寿司郎免费WiFi', '스시로 무료 WiFi', 'JP', ['SUSHIRO_Free_Wi-Fi'], 'agree_only', { notes: 'Conveyor belt sushi chain.' }),
  spot('jp-kurazushi-wifi', 'Kura Sushi Free WiFi', 'くら寿司 Free WiFi', '无添藏免费WiFi', '쿠라스시 무료 WiFi', 'JP', ['KURASUSHI_Free_Wi-Fi'], 'agree_only', { notes: 'Conveyor belt sushi chain.' }),
  spot('jp-hamazushi-wifi', 'Hama Sushi Free WiFi', 'はま寿司 Free WiFi', '滨寿司免费WiFi', '하마스시 무료 WiFi', 'JP', ['HAMAZUSHI_Free_Wi-Fi'], 'agree_only', { notes: 'Conveyor belt sushi chain. Zensho group.' }),
  spot('jp-coco-wifi', "Coco's Free WiFi", 'ココス Free WiFi', 'Cocos免费WiFi', '코코스 무료 WiFi', 'JP', ['COCOS_Free_Wi-Fi'], 'agree_only', { notes: 'Family restaurant chain. Zensho group.' }),
  spot('jp-joyfull-wifi', 'Joyfull Free WiFi', 'ジョイフル Free WiFi', 'Joyfull免费WiFi', '조이풀 무료 WiFi', 'JP', ['JOYFULL_Free_Wi-Fi'], 'agree_only', { notes: 'Family restaurant. Strong in Kyushu.' }),

  // ===== GLOBAL — Starbucks more countries =====
  spot('th-starbucks-wifi', 'Starbucks WiFi (Thailand)', 'スタバ WiFi（タイ）', '星巴克WiFi（泰国）', '스타벅스 WiFi (태국)', 'TH', ['Starbucks', 'Starbucks_TH'], 'agree_only', { notes: 'Starbucks Thailand. All stores.' }),
  spot('tw-starbucks-wifi', 'Starbucks WiFi (Taiwan)', 'スタバ WiFi（台湾）', '星巴克WiFi（台湾）', '스타벅스 WiFi (대만)', 'TW', ['Starbucks'], 'agree_only', { notes: 'Starbucks Taiwan.' }),
  spot('sg-starbucks-wifi', 'Starbucks WiFi (Singapore)', 'スタバ WiFi（シンガポール）', '星巴克WiFi（新加坡）', '스타벅스 WiFi (싱가포르)', 'SG', ['Starbucks'], 'agree_only', { notes: 'Starbucks Singapore.' }),
  spot('au-starbucks-wifi', 'Starbucks WiFi (Australia)', 'スタバ WiFi（豪州）', '星巴克WiFi（澳大利亚）', '스타벅스 WiFi (호주)', 'AU', ['Starbucks'], 'agree_only', { notes: 'Starbucks Australia.' }),
  spot('de-starbucks-wifi', 'Starbucks WiFi (Germany)', 'スタバ WiFi（ドイツ）', '星巴克WiFi（德国）', '스타벅스 WiFi (독일)', 'DE', ['Starbucks'], 'agree_only', { notes: 'Starbucks Germany.' }),
  spot('fr-starbucks-wifi', 'Starbucks WiFi (France)', 'スタバ WiFi（フランス）', '星巴克WiFi（法国）', '스타벅스 WiFi (프랑스)', 'FR', ['Starbucks'], 'agree_only', { notes: 'Starbucks France.' }),

  // ===== GLOBAL — McDonald's more countries =====
  spot('de-mcdonalds-wifi', "McDonald's WiFi (Germany)", 'マクドナルド WiFi（ドイツ）', '麦当劳WiFi（德国）', '맥도날드 WiFi (독일)', 'DE', ['McDonalds_Free_WiFi', 'Telekom_McDonalds'], 'agree_only', { notes: "McDonald's Germany via Telekom." }),
  spot('fr-mcdonalds-wifi', "McDonald's WiFi (France)", 'マクドナルド WiFi（フランス）', '麦当劳WiFi（法国）', '맥도날드 WiFi (프랑스)', 'FR', ['FreeWifi_McDo', 'McDo_WiFi'], 'agree_only', { notes: "McDonald's France." }),
  spot('au-mcdonalds-wifi', "McDonald's WiFi (Australia)", 'マクドナルド WiFi（豪州）', '麦当劳WiFi（澳大利亚）', '맥도날드 WiFi (호주)', 'AU', ['Maccas Free WiFi', 'McDonalds WiFi'], 'agree_only', { notes: "McDonald's Australia (called Macca's)." }),
  spot('th-mcdonalds-wifi', "McDonald's WiFi (Thailand)", 'マクドナルド WiFi（タイ）', '麦当劳WiFi（泰国）', '맥도날드 WiFi (태국)', 'TH', ['McDonalds_Free_WiFi_TH'], 'agree_only', { notes: "McDonald's Thailand." }),

  // ===== ADDITIONAL AIRPORTS — Global =====
  spot('lk-hri-wifi', 'Hambantota Mattala Airport', 'ハンバントタ空港', '汉班托塔机场', '함반토타 공항', 'LK', ['HRI Free WiFi'], 'agree_only', { airportCode: 'HRI', notes: 'Mattala Rajapaksa International.' }),
  spot('mn-uln-wifi', 'Ulaanbaatar Airport', 'ウランバートル空港', '乌兰巴托机场', '울란바토르 공항', 'MN', ['UBN Free WiFi'], 'agree_only', { airportCode: 'UBN', notes: 'Chinggis Khaan International Airport.' }),
  spot('bt-pby-wifi', 'Paro Airport', 'パロ空港', '帕罗机场', '파로 공항', 'BT', ['PBH Free WiFi'], 'agree_only', { airportCode: 'PBH', notes: 'Paro International Airport, Bhutan.' }),
  spot('am-evn-wifi', 'Yerevan Airport', 'エレバン空港', '埃里温机场', '예레반 공항', 'AM', ['EVN Free WiFi'], 'agree_only', { airportCode: 'EVN', notes: 'Zvartnots International, Armenia.' }),
  spot('cy-lca-wifi', 'Larnaca Airport', 'ラルナカ空港', '拉纳卡机场', '라르나카 공항', 'CY', ['LCA Free WiFi'], 'agree_only', { airportCode: 'LCA', notes: 'Larnaca International Airport, Cyprus.' }),
  spot('mt-mla-wifi', 'Malta Airport', 'マルタ空港', '马耳他机场', '몰타 공항', 'MT', ['MLA Free WiFi'], 'agree_only', { airportCode: 'MLA', notes: 'Malta International Airport.' }),
  spot('ee-tll-wifi', 'Tallinn Airport', 'タリン空港', '塔林机场', '탈린 공항', 'EE', ['TLL Free WiFi'], 'agree_only', { airportCode: 'TLL', notes: 'Tallinn Airport, Estonia.' }),
  spot('lv-rix-wifi', 'Riga Airport', 'リガ空港', '里加机场', '리가 공항', 'LV', ['RIX Free WiFi'], 'agree_only', { airportCode: 'RIX', notes: 'Riga International Airport, Latvia.' }),
  spot('lt-vno-wifi', 'Vilnius Airport', 'ヴィリニュス空港', '维尔纽斯机场', '빌뉴스 공항', 'LT', ['VNO Free WiFi'], 'agree_only', { airportCode: 'VNO', notes: 'Vilnius Airport, Lithuania.' }),
  spot('sk-bts-wifi', 'Bratislava Airport', 'ブラチスラバ空港', '布拉迪斯拉发机场', '브라티슬라바 공항', 'SK', ['BTS Free WiFi'], 'agree_only', { airportCode: 'BTS', notes: 'M. R. Stefanik Airport, Slovakia.' }),
  spot('si-ljub-wifi', 'Ljubljana Airport', 'リュブリャナ空港', '卢布尔雅那机场', '류블랴나 공항', 'SI', ['LJU Free WiFi'], 'agree_only', { airportCode: 'LJU', notes: 'Joze Pucnik Airport, Slovenia.' }),
  spot('rs-beg-wifi', 'Belgrade Airport', 'ベオグラード空港', '贝尔格莱德机场', '베오그라드 공항', 'RS', ['BEG Free WiFi'], 'agree_only', { airportCode: 'BEG', notes: 'Nikola Tesla Airport, Serbia.' }),

  // ===== GLOBAL — City WiFi expansion =====
  spot('gb-london-wifi', 'London Free WiFi', 'ロンドン市 WiFi', '伦敦市WiFi', '런던시 WiFi', 'GB', ['London Free WiFi', 'O2 Wifi'], 'agree_only', { notes: 'City of London public WiFi.' }),
  spot('us-la-wifi', 'LA Free WiFi', 'ロサンゼルス市 WiFi', '洛杉矶市WiFi', 'LA 시 WiFi', 'US', ['LA_City_WiFi', 'CityLinkLA'], 'agree_only', { notes: 'City of Los Angeles public WiFi.' }),
  spot('us-sf-wifi', 'San Francisco Free WiFi', 'サンフランシスコ市 WiFi', '旧金山市WiFi', '샌프란시스코 시 WiFi', 'US', ['#SFWiFi', 'SF Free WiFi'], 'agree_only', { notes: 'San Francisco city WiFi. Parks, plazas.' }),
  spot('us-chi-wifi', 'Chicago Free WiFi', 'シカゴ市 WiFi', '芝加哥市WiFi', '시카고 시 WiFi', 'US', ['ChicagoFreeWiFi'], 'agree_only', { notes: 'Chicago city WiFi.' }),
  spot('ca-toronto-wifi', 'Toronto Free WiFi', 'トロント市 WiFi', '多伦多市WiFi', '토론토 시 WiFi', 'CA', ['Toronto Free WiFi', 'TConnect'], 'agree_only', { notes: 'City of Toronto public WiFi.' }),
  spot('kr-seoul-wifi', 'Seoul Free WiFi', 'ソウル市 WiFi', '首尔市WiFi', '서울시 WiFi', 'KR', ['Seoul Free WiFi', 'Seoul_WiFi'], 'agree_only', { notes: 'Seoul Metropolitan Government free WiFi.' }),
  spot('tw-taipei-wifi', 'Taipei Free WiFi', '台北市 WiFi', '台北市WiFi', '타이베이시 WiFi', 'TW', ['Taipei Free', 'TPE-Free'], 'agree_only', { notes: 'Taipei city WiFi. MRT, buses, public areas.' }),
  spot('sg-city-wifi', 'Singapore City WiFi', 'シンガポール市 WiFi', '新加坡市WiFi', '싱가포르시 WiFi', 'SG', ['Wireless@SG'], 'agree_only', { notes: 'Singapore government city WiFi.' }),
  spot('hk-city-wifi', 'Hong Kong Free WiFi', '香港 WiFi', '香港WiFi', '홍콩 WiFi', 'HK', ['freegovwifi-e', 'freegovwifi'], 'agree_only', { notes: 'Hong Kong government free WiFi. HK-style.' }),
  spot('au-sydney-wifi', 'Sydney Free WiFi', 'シドニー市 WiFi', '悉尼市WiFi', '시드니 시 WiFi', 'AU', ['Sydney Free WiFi'], 'agree_only', { notes: 'City of Sydney public WiFi.' }),
  spot('nz-auckland-wifi', 'Auckland Free WiFi', 'オークランド市 WiFi', '奥克兰市WiFi', '오클랜드 시 WiFi', 'NZ', ['Auckland WiFi'], 'agree_only', { notes: 'Auckland city WiFi.' }),

  // ===== GLOBAL — Coworking / Modern chains =====
  spot('global-regus-wifi', 'Regus / IWG WiFi', 'リージャス WiFi', 'Regus WiFi', '리저스 WiFi', 'GLOBAL', ['Regus_Guest', 'IWG_Guest'], 'registration', { notes: 'Regus, Spaces, HQ offices. Global coworking.' }),
  spot('global-wework-wifi', 'WeWork Guest WiFi', 'WeWork WiFi', 'WeWork WiFi', 'WeWork WiFi', 'GLOBAL', ['WeWork_Guest', 'WW-Guest'], 'registration', { notes: 'WeWork coworking spaces. Guest WiFi.' }),

  // ===== CHINA — More airports =====
  spot('cn-wuhan-wifi', 'Wuhan Airport', '武漢空港', '武汉天河机场', '우한 공항', 'CN', ['WUH Free WiFi'], 'registration', { airportCode: 'WUH', notes: 'Wuhan Tianhe International Airport.' }),
  spot('cn-kunming-wifi', 'Kunming Airport', '昆明空港', '昆明长水机场', '쿤밍 공항', 'CN', ['KMG Free WiFi'], 'registration', { airportCode: 'KMG', notes: 'Kunming Changshui International.' }),
  spot('cn-xian-wifi', "Xi'an Airport", '西安空港', '西安咸阳机场', '시안 공항', 'CN', ['XIY Free WiFi'], 'registration', { airportCode: 'XIY', notes: "Xi'an Xianyang International. Terracotta Warriors gateway." }),
  spot('cn-guilin-wifi', 'Guilin Airport', '桂林空港', '桂林两江机场', '구이린 공항', 'CN', ['KWL Free WiFi'], 'registration', { airportCode: 'KWL', notes: 'Guilin Liangjiang International.' }),
  spot('cn-sanya-wifi', 'Sanya Phoenix Airport', '三亜空港', '三亚凤凰机场', '싼야 공항', 'CN', ['SYX Free WiFi'], 'registration', { airportCode: 'SYX', notes: 'Sanya Phoenix International. Hainan beach resort.' }),

  // ===== PHILIPPINES — Commercial =====
  spot('ph-ayala-wifi', 'Ayala Malls WiFi', 'アヤラモール WiFi', 'Ayala购物中心WiFi', '아얄라 몰 WiFi', 'PH', ['AyalaMalls_Free_WiFi'], 'registration', { notes: 'Ayala Malls. Glorietta, Greenbelt, Trinoma.' }),
  spot('ph-robinsons-wifi', 'Robinsons Malls WiFi', 'ロビンソンズモール WiFi', 'Robinsons商场WiFi', '로빈슨 몰 WiFi', 'PH', ['Robinsons_Free_WiFi'], 'registration', { notes: 'Robinsons Malls. Ermita, Galleria, Magnolia.' }),

  // ===== INDIA — More cities =====
  spot('in-hyderabad-wifi', 'Hyderabad Airport', 'ハイデラバード空港', '海德拉巴机场', '하이데라바드 공항', 'IN', ['HYD Free WiFi'], 'registration', { airportCode: 'HYD', notes: 'Rajiv Gandhi International Airport.' }),
  spot('in-kolkata-wifi', 'Kolkata Airport', 'コルカタ空港', '加尔各答机场', '콜카타 공항', 'IN', ['CCU Free WiFi'], 'registration', { airportCode: 'CCU', notes: 'Netaji Subhas Chandra Bose International.' }),
  spot('in-ahmedabad-wifi', 'Ahmedabad Airport', 'アーメダバード空港', '艾哈迈达巴德机场', '아메다바드 공항', 'IN', ['AMD Free WiFi'], 'registration', { airportCode: 'AMD', notes: 'Sardar Vallabhbhai Patel International.' }),
  spot('in-goa-wifi', 'Goa Airport', 'ゴア空港', '果阿机场', '고아 공항', 'IN', ['GOI Free WiFi'], 'registration', { airportCode: 'GOI', notes: 'Goa International Airport. Beach resort.' }),

  // ===== ADDITIONAL GLOBAL AIRPORTS =====
  spot('za-dur-wifi', 'Durban King Shaka Airport', 'ダーバン空港', '德班机场', '더반 공항', 'ZA', ['DUR Free WiFi'], 'agree_only', { airportCode: 'DUR', notes: 'King Shaka International, Durban.' }),
  spot('ug-ebb-wifi', 'Entebbe Airport', 'エンテベ空港', '恩德培机场', '엔테베 공항', 'UG', ['EBB Free WiFi'], 'agree_only', { airportCode: 'EBB', notes: 'Entebbe International Airport, Uganda.' }),
  spot('rw-kgl-wifi', 'Kigali Airport', 'キガリ空港', '基加利机场', '키갈리 공항', 'RW', ['KGL Free WiFi'], 'agree_only', { airportCode: 'KGL', notes: 'Kigali International Airport, Rwanda.' }),
];

const newGeofences = [
  // Mongolia/Central Asia/Caucasus
  geo('mn-uln-wifi', 47.8432, 106.7666, 2000),
  geo('am-evn-wifi', 40.1473, 44.3959, 1500),
  // Europe
  geo('cy-lca-wifi', 34.8754, 33.6249, 1000),
  geo('mt-mla-wifi', 35.8575, 14.4775, 1000),
  geo('ee-tll-wifi', 59.4133, 24.8328, 1000),
  geo('lv-rix-wifi', 56.9236, 23.9711, 1500),
  geo('lt-vno-wifi', 54.6340, 25.2858, 1000),
  geo('sk-bts-wifi', 48.1702, 17.2127, 1000),
  geo('si-ljub-wifi', 46.2237, 14.4576, 1000),
  geo('rs-beg-wifi', 44.8184, 20.3091, 1500),
  // China
  geo('cn-wuhan-wifi', 30.7838, 114.2081, 2000),
  geo('cn-kunming-wifi', 24.9924, 102.7433, 2000),
  geo('cn-xian-wifi', 34.4471, 108.7516, 2000),
  geo('cn-guilin-wifi', 25.2181, 110.0390, 1500),
  geo('cn-sanya-wifi', 18.3029, 109.4120, 1500),
  // India
  geo('in-hyderabad-wifi', 17.2403, 78.4294, 2000),
  geo('in-kolkata-wifi', 22.6547, 88.4467, 2000),
  geo('in-ahmedabad-wifi', 23.0772, 72.6347, 1500),
  geo('in-goa-wifi', 15.3808, 73.8314, 1500),
  // Africa
  geo('za-dur-wifi', -29.6144, 31.1197, 1500),
  geo('ug-ebb-wifi', 0.0424, 32.4435, 1500),
  geo('rw-kgl-wifi', -1.9686, 30.1395, 1500),
  // Other
  geo('bt-pby-wifi', 27.4032, 89.4255, 1000),
  geo('lk-hri-wifi', 6.2848, 81.1241, 1500),
];

// Add spots
let added = 0;
for (const s of newSpots) {
  if (!data.patterns.find(p => p.spotId === s.spotId)) { data.patterns.push(s); added++; }
  else { console.log(`Skip: ${s.spotId}`); }
}
console.log(`Added ${added} spots`);

// Add geofences
let geoAdded = 0;
for (const g of newGeofences) {
  if (!geoData.regions.find(r => r.spotId === g.spotId)) { geoData.regions.push(g); geoAdded++; }
}

data.version = 13; data.updatedAt = '2026-03-10';
geoData.version = 8; geoData.updatedAt = '2026-03-10';

fs.writeFileSync(patternsPath, JSON.stringify(data, null, 2) + '\n');
fs.writeFileSync(geofencePath, JSON.stringify(geoData, null, 2) + '\n');

console.log(`Total patterns: ${data.patterns.length}`);
console.log(`Added ${geoAdded} geofences (total: ${geoData.regions.length})`);
