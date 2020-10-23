//接口统一管理

//这里是解决跨域接口  '/apis'为代理域名（在vue.config.js里配置跨域）
const host = process.env.NODE_ENV == 'development' ? '/api' : `${location.protocol}//${location.host}`;
// const host='http://7428.chac.xyz';

const apiUrl = `${host}/app/index.php?i=96&c=entry&m=wx_shop&do=mobile&r=api.`;
//http://7751.iiio.top/app/index.php?i=96&c=entry&m=wx_shop&do=mobile&r=api.home.verifycode
const base = {
    home: apiUrl + 'home', //首页的轮播图+公告
    sumcredit: apiUrl + 'home.sumcredit', //统计收益
    levellist: apiUrl + 'home.levellist', //会员等级
    login: apiUrl + 'home.login', //登录
    register: apiUrl + 'home.register', //注册或找回密码
    center: apiUrl + 'home.center', //个人中心
    logo: apiUrl + 'home.logo', //logo
    indexphb: apiUrl + 'home.indexphb', //首页排行榜
    typebank: apiUrl + 'home.typebank', //银行卡选择
    uppwd: apiUrl + 'home.uppwd', //修改密码
    gameindex: apiUrl + 'home.gameindex', //大转盘数据
    avatar: apiUrl + 'home.avatar', //用户头像
    yhavatar: apiUrl + 'home.yhavatar', //用户头像的更改
    paybinding: apiUrl + 'home.paybinding', //信息的设置
    gndisplay: apiUrl + 'home.gndisplay', //微信支付宝的展示
    game: apiUrl + 'home.game', //大转盘抽奖
    gamelog: apiUrl + 'home.gamelog', //抽奖记录
    rechargeindex: apiUrl + 'home.rechargeindex', //充值的微信和支付宝的收款码
    recharge: apiUrl + 'home.recharge', //充值的提交
    renwu: apiUrl + 'renwu', //任务列表
    jierenwu: apiUrl + 'renwu.jierenwu', //接收任务
    number: apiUrl + 'number', //账号绑定的界面
    accountbinding: apiUrl + 'number.accountbinding', //账号绑定
    jiechu: apiUrl + 'number.jiechu', //解除绑定
    renwu_log: apiUrl + 'renwu.renwu_log', //任务记录
    renwu_level: apiUrl + 'renwu.renwu_level', //任务等级
    addimge: apiUrl + 'renwu.addimge', //任务记录
    tijiao_renwu: apiUrl + 'renwu.tijiao_renwu', //提交任务
    fabu_renwu: apiUrl + 'renwu.fabu_renwu', //发布任务
    wenzhang_type: apiUrl + 'home.wenzhang_type', //帮助中心列表
    help_center: apiUrl + 'home.help_center', //帮助中心详情
    wenzhang_xiangqing: apiUrl + 'home.wenzhang_xiangqing', //帮助中心详细Text
    tuiguang: apiUrl + 'home.tuiguang', //分享中心
    withdraw: apiUrl + 'home.withdraw', //提现
    tixian_log: apiUrl + 'home.tixian_log', //提现记录
    recharge_log: apiUrl + 'home.recharge_log', //充值记录
    shouyi_log: apiUrl + 'home.shouyi_log', //收益记录
    rijiebaobiao: apiUrl + 'home.rijiebaobiao', //日结报表
    team: apiUrl + 'home.team', //团队报表
    buy_level: apiUrl + 'home.buy_level', //vip加入
    my_wallet: apiUrl + 'home.my_wallet', //我的钱包
    my_credit: apiUrl + 'home.my_credit', //我的信用记录
    new_team: apiUrl + 'home.new_team', //团队报表-三级
    member_background: apiUrl + 'home.member_background', //会员背景
    my_list: apiUrl + 'home.my_list', //会员背景
    sendcode: apiUrl + 'home.verifycode', //短信验证














    upxiaoxin: apiUrl + 'home.upxiaoxin', //消息已读




    main: apiUrl + 'index&op=main', //首页的轮播图
    task_list: apiUrl + 'index&op=task_list', //首页的列表
    apis: apiUrl + 'apis',
    getinfo: apiUrl + 'userinfo&op=getinfo', //我的接口
    news: apiUrl + 'index&op=news',
    one_new: apiUrl + 'index&op=one_new',
    setmeal: apiUrl + 'index&op=setmeal', //记录
    my_task_list: apiUrl + 'userinfo&op=my_task_list',
    pay_setmeal: apiUrl + 'userinfo&op=pay_setmeal',
    receive_tasks: apiUrl + 'userinfo&op=receive_tasks',
    my_task_one: apiUrl + 'userinfo&op=my_task_one',
    my_setmeal_list: apiUrl + 'userinfo&op=my_setmeal_list',
    publish: apiUrl + 'userinfo&op=publish',
    my_publish: apiUrl + 'userinfo&op=my_publish',
    submit_withdraw: apiUrl + 'userinfo&op=submit_withdraw',
    level: apiUrl + 'userinfo&op=level',
    bill_flow: apiUrl + 'userinfo&op=bill_flow',
    record: apiUrl + 'userinfo&op=record', //提现接口
    logout: apiUrl + 'userinfo&op=logout',
    // sendcode: `${host}/app/index.php?i=4&c=entry&p=sendcode&do=member&m=sz_yi&op=sendcode`,
    revise_psd: apiUrl + 'userinfo&op=revise_psd',
    forgetpwd: apiUrl + 'userinfo&op=forgetpwd',
    forgetcode: `${host}/app/index.php?i=4&c=entry&p=sendcode&do=member&m=sz_yi&op=forgetcode`,
    uploader: `${host}/app/index.php?i=4&c=entry&p=uploader&do=apis&m=sz_yi`,
    task_sublimt: apiUrl + 'userinfo&op=task_sublimt',
    member: `${host}/app/index.php?i=4&c=entry&p=webinfo&do=apis&m=sz_yi&op=member`,
    reward: `${host}/app/index.php?i=4&c=entry&p=webinfo&do=apis&m=sz_yi&op=reward`,
    setmeal_list: `${host}/app/index.php?i=4&c=entry&p=webinfo&do=apis&m=sz_yi&op=setmeal_list`,
    weblogout: `${host}/app/index.php?i=4&c=entry&p=webinfo&do=apis&m=sz_yi&op=logout`,
    exoneration: `${host}/app/index.php?i=4&c=entry&do=apis&m=sz_yi&p=index&op=mz_article`, // 免责条款
    //exoneration:`http://7428.chac.xyz/app/index.php?i=4&c=entry&do=apis&m=sz_yi&p=index&op=mz_article`, // 免责条款
    erm_code: `${host}/app/index.php?i=4&c=entry&do=apis&m=sz_yi&p=userinfo&op=qrimages`, // 点击切换收款码
    //erm_code: `http://7428.chac.xyz/app/index.php?i=4&c=entry&do=apis&m=sz_yi&p=userinfo&op=qrimages`,  // 点击切换收款码
    recharge_new: `${host}/app/index.php?i=4&c=entry&do=apis&m=sz_yi&p=userinfo&op=topup`,
    //recharge_new: `http://7428.chac.xyz/app/index.php?i=4&c=entry&do=apis&m=sz_yi&p=userinfo&op=topup`,
    kefu: `${host}/app/index.php?i=4&c=entry&do=apis&m=sz_yi&p=index&op=kefu`,
}

export default base;