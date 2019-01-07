const safeManage = {
  authority: null,
  children: [
    {
      authority: null,
      children: [],
      code: null,
      component: "views/safeManage/safeManageAudit",
      icon: "icon-weibiaoti13",
      id: 5100,
      keepAlive: "0",
      label: "资源审计",
      name: "资源审计",
      parentId: 5000,
      path: "/safeManager/audit",
      redirect: null,
      sort: 1,
      spread: false,
      type: "0"
    },
    {
      authority: null,
      children: [],
      code: null,
      component: "views/safeManage/safeManageLogvisit",
      icon: "icon-weibiaoti13",
      id: 5200,
      keepAlive: "0",
      label: "日记访问",
      name: "日记访问",
      parentId: 5000,
      path: "/safeManage/logvisit",
      redirect: null,
      sort: 1,
      spread: false,
      type: "0"
    }
  ],
  code: null,
  component: "safeManage",
  icon: "icon-kuaisugongzuoliu_o",
  id: 5000,
  keepAlive: "0",
  label: "安全管理",
  name: "安全管理",
  parentId: -1,
  path: "/safeManage",
  redirect: null,
  sort: 3,
  spread: false,
  type: "0"
}
export default safeManage
