import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from '../components/login/login.vue'
import register from '../components/login/register.vue'
import index from '../components/index/index.vue'
import footer from '../components/index/footer.vue'
import release from '../components/index/release.vue'
import detail from '../components/index/detail.vue'
import poster from '../components/index/poster.vue'
import task from '../components/index/task.vue'
import vip from '../components/index/vip.vue'
import mytask from '../components/mytask/mytask.vue'
import setmeal from '../components/setmeal/setmeal.vue'
import personal from '../components/personal/personal.vue'
import financial from '../components/personal/financial.vue'
import issue from '../components/personal/issue.vue'
import manage from '../components/personal/manage.vue'
import issuedetail from '../components/personal/issuedetail.vue'
import withdraw from '../components/personal/withdraw.vue'
import record from '../components/personal/record.vue'
import forget from '../components/login/forget.vue'
import taskdetail from '../components/mytask/taskdetail.vue'
import weblogin from '../components/pc/weblogin.vue'
import webindex from '../components/pc/webindex.vue'
import recharge from '../components/personal/recharge.vue'
import kefu from '../components/personal/kefu.vue'
import information from '../components/personal/information.vue'
import infotouxian from '../components/personal/infotouxian.vue'

import setting from '../components/personal/setting.vue'
import payPal from '../components/personal/payPal.vue'
import wachatPal from '../components/personal/wachatPal.vue'
import bindbank from '../components/personal/bindbank.vue'
import personMess from '../components/personal/personMess.vue'
import intAccount from '../components/personal/intAccount.vue'
import dayImport from '../components/personal/dayImport.vue'
import inpersonRecord from '../components/personal/inpersonRecord.vue'
import share from '../components/personal/share.vue'
import helpSign from '../components/personal/helpSign.vue'
import steward from '../components/personal/steward.vue'
import totalProt from '../components/personal/totalProt.vue'
import bigWheel from '../components/personal/bigWheel.vue'
import bigWheelRecord from '../components/personal/bigWheelRecord.vue'

import fashionShop from '../components/personal/fashionShop.vue'
import minCredit from '../components/personal/minCredit.vue'
import minCreditRecord from '../components/personal/minCreditRecord.vue'

import releaseTast from '../components/personal/releaseTast.vue'
import myMoney from '../components/personal/myMoney.vue'
import transferAccount from '../components/personal/transferAccount.vue'
import helpSignDetail from '../components/personal/helpSignDetail.vue'
import helpSignDetailText from '../components/personal/helpSignDetailText.vue'



Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const routes = [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
        path: '/',
        name: 'login',
        component: login
    },
    {
        path: '/register',
        name: 'register',
        component: register
    },
    {
        path: '/forget',
        name: 'forget',
        component: forget
    },
    {
        path: '/weblogin',
        name: 'weblogin',
        component: weblogin
    },
    {
        path: '/webindex',
        name: 'webindex',
        component: webindex
    },
    {
        path: '/recharge',
        name: 'recharge',
        component: recharge
    },
    {
        path: '/kefu',
        name: 'kefu',
        component: kefu
    },
    {
        path: '/information',
        name: 'information',
        component: information,
        meta: {
            name: '信息通知',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/infotouxian',
        name: 'infotouxian',
        component: infotouxian,
        meta: {
            name: '头像设置',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/setting',
        name: 'setting',
        component: setting,
        meta: {
            name: '个人信息',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/payPal',
        name: 'payPal',
        component: payPal,
        meta: {
            name: '支付宝信息',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/wachatPal',
        name: 'wachatPal',
        component: wachatPal,
        meta: {
            name: '微信信息',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/bindbank',
        name: 'bindbank',
        component: bindbank,
        meta: {
            name: '银行卡信息',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/personMess',
        name: 'personMess',
        component: personMess,
        meta: {
            name: '详细信息',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/intAccount',
        name: 'intAccount',
        component: intAccount,
        meta: {
            name: '帐号绑定',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/dayImport',
        name: 'dayImport',
        component: dayImport,
        meta: {
            name: '日结报表',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/inpersonRecord',
        name: 'inpersonRecord',
        component: inpersonRecord,
        meta: {
            name: '账户收入',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/share',
        name: 'share',
        component: share,
        meta: {
            name: '邀请好友',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/helpSign',
        name: 'helpSign',
        component: helpSign,
        meta: {
            name: '帮助中心',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/helpSignDetail',
        name: 'helpSignDetail',
        component: helpSignDetail,
        meta: {
            name: '分类详情',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/helpSignDetailText',
        name: 'helpSignDetailText',
        component: helpSignDetailText,
        meta: {
            name: '详情信息',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/steward',
        name: 'steward',
        component: steward,
        meta: {
            name: '云管家',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/totalProt',
        name: 'totalProt',
        component: totalProt,
        meta: {
            name: '团队报表',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/bigWheel',
        name: 'bigWheel',
        component: bigWheel,
        meta: {
            name: '大转盘',
            isBack: true,
            isLink: true,
            routerLink: "bigWheelRecord",
            routerName: "抽奖记录"
        }
    },
    {
        path: '/bigWheelRecord',
        name: 'bigWheelRecord',
        component: bigWheelRecord,
        meta: {
            name: '抽奖记录',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/fashionShop',
        name: 'fashionShop',
        component: fashionShop,
        meta: {
            name: '时尚小店',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/minCredit',
        name: 'minCredit',
        component: minCredit,
        meta: {
            name: '我的信用',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/minCreditRecord',
        name: 'minCreditRecord',
        component: minCreditRecord,
        meta: {
            name: '信用记录',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/releaseTast',
        name: 'releaseTast',
        component: releaseTast,
        meta: {
            name: '发布任务',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/myMoney',
        name: 'myMoney',
        component: myMoney,
        meta: {
            name: '我的钱包',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/transferAccount',
        name: 'transferAccount',
        component: transferAccount,
        meta: {
            name: '转账操作',
            isBack: true,
            isLink: false,
            routerLink: "",
            routerName: ""
        }
    },
    {
        path: '/release',
        name: 'release',
        component: release,
        meta: {
            islg: true
        },
    },
    {
        path: '/detail',
        name: 'detail',
        component: detail,
        meta: {
            islg: true
        },
    },
    {
        path: '/poster',
        name: 'poster',
        component: poster,
        meta: {
            islg: true
        },
    },
    {
        path: '/financial',
        name: 'financial',
        component: financial,
        meta: {
            islg: true
        },
    },
    {
        path: '/taskdetail',
        name: 'taskdetail',
        component: taskdetail,
        meta: {
            islg: true
        },
    },
    {
        path: '/issue',
        name: 'issue',
        component: issue,
        meta: {
            islg: true
        },
    },
    {
        path: '/manage',
        name: 'manage',
        component: manage,
        meta: {
            islg: true
        },
    },
    {
        path: '/issuedetail',
        name: 'issuedetail',
        component: issuedetail,
        meta: {
            islg: true
        },
    },

    {
        path: '/withdraw',
        name: 'withdraw',
        component: withdraw,
        meta: {
            islg: true
        },
    },
    {
        path: '/record',
        name: 'record',
        component: record,
        meta: {
            islg: true
        },
    },
    {
        path: '/mytask',
        name: 'mytask',
        component: mytask,
        meta: {
            islg: true
        },
    },
    {
        path: '/footer',
        name: 'footer',
        component: footer,
        redirect: 'index',
        meta: {
            islg: true
        },
        children: [{
                path: '/index',
                name: 'index',
                component: index,
                meta: {
                    islg: true
                },
            },
            {
                path: '/vip',
                name: 'vip',
                component: vip,
                meta: {
                    islg: true
                },
            },
            {
                path: '/task',
                name: 'task',
                component: task,
                meta: {
                    islg: true
                },
            },
            {
                path: '/setmeal',
                name: 'setmeal',
                component: setmeal,
                meta: {
                    islg: true
                },
            },
            {
                path: '/personal',
                name: 'personal',
                component: personal,
                meta: {
                    islg: true
                },
            },
        ]
    },


    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]


const router = new VueRouter({
    // mode: 'history',  这是使路由后边的不显示 需要后台配合
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})



export default router