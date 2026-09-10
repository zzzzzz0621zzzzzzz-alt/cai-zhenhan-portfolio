'use client';

import { useEffect, useState } from 'react';

type Hotspot = { page: number; href: string; rect: [number, number, number, number]; label: string };
const pages = Array.from({ length: 9 }, (_, index) => index + 1);
const hotspots: Hotspot[] = [
  { page: 4, href: 'https://www.xinhuanet.com/20260501/80a5de936e584f9fa3d5c37887679830/c.html', rect: [.04,.17,.435,.735], label: '从“新”出发 万商共赴' },
  { page: 4, href: 'https://app.xinhuanet.com/news/article.html?articleId=2026043080824e92520d475489574aacdb7bb819', rect: [.585,.23,.825,.485], label: '透视“心机商标”背后的文字游戏' },
  { page: 4, href: 'https://www.news.cn/politics/20260320/1c65610b67ed49ed95858be209860388/c.html', rect: [.135,.79,.34,.95], label: '微纪录片｜英歌无畏' },
  { page: 4, href: 'https://www.xinhuanet.com/20260605/1c2ab0545ca14c0ca026469b6ac1996e/c.html', rect: [.36,.79,.555,.95], label: '乡村“领头雁”沉下身子带头干' },
  { page: 4, href: 'https://h.xinhuaxmt.com/vh512/share/13214926?docid=13214926&newstype=1001&d=1352776&channel=weixin&time=1785130243232', rect: [.585,.5,.825,.735], label: '当高尔夫走进城市新空间' },
  { page: 4, href: 'https://h.xinhuaxmt.com/vh512/share/13142696?docid=13142696&newstype=1001&d=1352701&channel=weixin&time=1781022027136', rect: [.585,.79,.825,.95], label: '第三届中国认证认可大会在广州举行' },
  { page: 5, href: 'https://weixin.qq.com/sph/A99Uieyo2X', rect: [.055,.335,.215,.82], label: '2026多彩乡村参赛规则' },
  { page: 5, href: 'https://weixin.qq.com/sph/A0YViyFRKv', rect: [.22,.405,.385,.87], label: '2026多彩乡村｜我的村志我来修' },
  { page: 5, href: 'https://weixin.qq.com/sph/Aj7qnExIjH', rect: [.415,.33,.595,.82], label: '贵州大山里藏着一条航空生产线？' },
  { page: 5, href: 'https://weixin.qq.com/sph/AYjAmUHvKH', rect: [.61,.39,.73,.79], label: '非遗｜苗族蜡染：蓝白间的清凉' },
  { page: 5, href: 'https://weixin.qq.com/sph/A81hipZoiV', rect: [.74,.405,.85,.79], label: '下一站，地戏' },
  { page: 5, href: 'https://weixin.qq.com/sph/Ao6e4B0vJh', rect: [.865,.405,.975,.79], label: '晴雨皆宜｜“我在平坝等你”' },
  { page: 6, href: 'https://m.itouchtv.cn/article/4e17764158f1eddaab288c2c9d5823a4', rect: [.338,.385,.44,.83], label: '触电新闻作品' },
  { page: 6, href: 'https://m.itouchtv.cn/article/91fa6e973813dd4087459251a1b916f6', rect: [.61,.32,.7,.75], label: '触电新闻作品' },
  { page: 6, href: 'https://m.itouchtv.cn/article/56163ee4e40edcf53a738a1b24cb4e83', rect: [.7,.36,.79,.745], label: '触电新闻作品' },
  { page: 6, href: 'https://m.itouchtv.cn/video/2cbaf18c1b507f40a1c589401a617054', rect: [.885,.335,.972,.74], label: '触电新闻视频作品' },
  { page: 6, href: 'https://weixin.qq.com/sph/AEzAXSIZA3', rect: [.395,.105,.615,.875], label: '立春“春捂”有讲究' },
  { page: 6, href: 'https://weixin.qq.com/sph/A6UfuPdLwF', rect: [.79,.34,.885,.74], label: '老人跌倒急救步骤' },
  { page: 7, href: 'https://m.itouchtv.cn/article/d765d7f40adc4cc969a2910e8d1214f0', rect: [.035,.245,.21,.505], label: '触电新闻作品' },
  { page: 7, href: 'https://m.itouchtv.cn/video/2cbaf18c1b507f40a1c589401a617054', rect: [.035,.535,.21,.765], label: '触电新闻视频作品' },
  { page: 7, href: 'https://m.itouchtv.cn/article/56163ee4e40edcf53a738a1b24cb4e83', rect: [.395,.535,.575,.765], label: '触电新闻作品' },
  { page: 7, href: 'https://search.bilibili.com/all?keyword=%E4%B8%AD%E5%B1%B1%E5%A4%A7%E5%AD%A6%E9%99%84%E5%B1%9E%E7%AC%AC%E4%B8%80%E5%8C%BB%E9%99%A2%20%E7%AC%AC268%E6%9C%9F%20%E5%8D%B5%E5%B7%A2%E6%97%A9%E8%A1%B0%E7%9A%843%E4%B8%AA%E4%BF%A1%E5%8F%B7', rect: [.215,.245,.39,.505], label: '卵巢早衰的3个信号' },
  { page: 7, href: 'https://search.bilibili.com/all?keyword=%E4%B8%AD%E5%B1%B1%E5%A4%A7%E5%AD%A6%E9%99%84%E5%B1%9E%E7%AC%AC%E4%B8%80%E5%8C%BB%E9%99%A2%20%E7%AC%AC267%E6%9C%9F%20%E9%A2%84%E9%98%B2%E8%A1%80%E6%A0%93%E7%9A%84%E6%87%92%E4%BA%BA%E5%8A%A8%E4%BD%9C', rect: [.395,.245,.575,.505], label: '预防血栓的懒人动作' },
  { page: 7, href: 'https://weixin.qq.com/sph/AkYKRX6rjv', rect: [.58,.19,.97,.76], label: '胆囊癌健康科普' },
  { page: 7, href: 'https://weixin.qq.com/sph/A6UfuPdLwF', rect: [.215,.535,.39,.765], label: '老人跌倒急救步骤' },
  { page: 8, href: 'https://m.itouchtv.cn/article/b62de23566b25284420980460d51eed0', rect: [.04,.16,.49,.61], label: '多彩乡村项目' },
  { page: 8, href: 'https://m.itouchtv.cn/video/1ae62a6e921dd7e4b20aed97beff3a3b', rect: [.73,.155,.965,.405], label: '平坝文旅项目' },
  { page: 8, href: 'https://m.itouchtv.cn/article/91fa6e973813dd4087459251a1b916f6', rect: [.04,.7,.23,.94], label: '乡村文化作品' },
  { page: 8, href: 'https://m.itouchtv.cn/article/4e17764158f1eddaab288c2c9d5823a4', rect: [.69,.7,.86,.94], label: '文旅内容作品' },
  { page: 8, href: 'https://weixin.qq.com/sph/AEzAXSIZA3', rect: [.505,.155,.72,.405], label: '立春“春捂”有讲究' },
  { page: 8, href: 'https://weixin.qq.com/sph/AO0WqbcQUW', rect: [.505,.45,.72,.69], label: '肺功能恢复科普' },
  { page: 8, href: 'https://mp.weixin.qq.com/s/bF5RxZ1tty6o_e2iTzr-CA', rect: [.73,.45,.965,.69], label: '乳腺健康科普' },
  { page: 8, href: 'https://weixin.qq.com/sph/A5tDIStxts', rect: [.38,.7,.57,.94], label: '乳腺筛查科普' },
  ...[[.025,.255,.455,.815],[.465,.255,.685,.56],[.695,.255,.975,.56],[.465,.575,.975,.82]].map((rect, index) => ({ page: 9, href: 'https://readymag.website/6037281', rect: rect as [number,number,number,number], label: `交互数据新闻图表 ${index + 1}` })),
];

export default function Home() {
  const [current, setCurrent] = useState(1);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setCurrent(Number(visible.target.getAttribute('data-page')));
    }, { threshold: [.25,.55,.8] });
    document.querySelectorAll('[data-page]').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  const goTo = (page: number) => document.getElementById(`page-${page}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  return <main>
    <nav className="site-nav" aria-label="作品集导航">
      <button className="identity" onClick={() => goTo(1)} aria-label="返回封面"><span className="identity-mark">蔡</span><span>蔡臻晗 · 作品集</span></button>
      <div className="page-nav" aria-label="页面索引">{pages.map((page) => <button key={page} className={page === current ? 'active' : ''} onClick={() => goTo(page)} aria-label={`前往第 ${page} 页`}>{String(page).padStart(2,'0')}</button>)}</div>
      <span className="counter">{String(current).padStart(2,'0')} / 09</span>
    </nav>
    <section className="portfolio" aria-label="蔡臻晗个人作品集">
      {pages.map((page) => <article id={`page-${page}`} data-page={page} className="slide" key={page} aria-label={`作品集第 ${page} 页`}>
        <img src={`/pages/page-${page}.jpg`} alt={`蔡臻晗个人作品集第 ${page} 页`} loading={page <= 2 ? 'eager' : 'lazy'} />
        {hotspots.filter((item) => item.page === page).map((item, index) => { const [left,top,right,bottom] = item.rect; return <a key={`${item.href}-${index}`} className="hotspot" href={item.href} target="_blank" rel="noreferrer" aria-label={`${item.label}（在新窗口打开）`} title={item.label} style={{ left:`${left*100}%`,top:`${top*100}%`,width:`${(right-left)*100}%`,height:`${(bottom-top)*100}%` }}><span>↗</span></a>; })}
      </article>)}
    </section>
    <footer>CAI ZHENHAN · PROJECT PORTFOLIO · 2026</footer>
  </main>;
}
