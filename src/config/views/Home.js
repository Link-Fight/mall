import swipers from '../components/swipers'
const activitys = [
  {
    img: 'https://img10.360buyimg.com/babel/s350x180_jfs/t1/5609/18/14480/100587/5bdba3e5Ed6d6bc7b/cc78ee0b1e8727a9.jpg!q90!cc_350x180',
    title: '关怀计划1',
    subTitle: '帮助农民精准、高效地管理'
  },
  {
    img: 'http://iot.xaircraft.com/static/img/banner.1d9e58c.png',
    title: '智慧农业2',
    subTitle: '改善生产、保障我们的食品'
  },
  {
    img: 'http://iot.xaircraft.com/static/img/banner.1d9e58c.png',
    title: '关注环境保护3',
    subTitle: '联和蚂蚁森林、用科技守护'
  },
  {
    img: 'http://iot.xaircraft.com/static/img/banner.1d9e58c.png',
    title: '关注环境保护4',
    subTitle: '联和蚂蚁森林、用科技守护'
  },
  {
    img: 'http://iot.xaircraft.com/static/img/banner.1d9e58c.png',
    title: '关注环境保护5',
    subTitle: '联和蚂蚁森林、用科技守护'
  },
  {
    img: 'http://iot.xaircraft.com/static/img/banner.1d9e58c.png',
    title: '关注环境保护6',
    subTitle: '联和蚂蚁森林、用科技守护'
  }
]
const good = {
  img: 'https://static.xag.cn/img/brand/xai-img-1.png',
  title: 'P10 2018款植保无人机',
  subTitle: '手自一体，小巧全能',
  tip: '一体化程度提高，维护方便',
  price: '12000'
}
export default {
  swipers,
  activitys: activitys.slice(0, 6),
  goods: [
    good, good, good, good, good, good, good, good, good, good
  ],
  items: [
    {
      img: 'http://iot.xaircraft.com/static/img/banner.1d9e58c.png',
      label: 'P10',
      href: 'https://www.baidu.com'
    },
    {
      img: 'http://iot.xaircraft.com/static/img/banner.1d9e58c.png',
      label: 'P20',
      href: 'https://www.baidu.com'
    },
    {
      img: 'http://iot.xaircraft.com/static/img/banner.1d9e58c.png',
      label: 'P30',
      href: 'https://www.baidu.com'
    },
    {
      img: 'http://iot.xaircraft.com/static/img/banner.1d9e58c.png',
      label: 'C2000',
      href: 'https://www.baidu.com'
    },
    {
      img: 'http://iot.xaircraft.com/static/img/banner.1d9e58c.png',
      label: '更多',
      href: 'https://www.baidu.com'
    }
  ]
}