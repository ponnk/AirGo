export default {
  adminUser: {
    userInfo:"用戶資訊",
    query:"査詢",
    add_user:"新增用戶",
    modify_user:"修改用戶",
    advanced_query:"高級查詢",
    customerService:"客戶服務",
    SysUser:{
      index:"序號",
      created_at: "創建時間",
      updated_at: "更新時間",
      id:"id",
      uuid: "uuid",
      user_name: "用戶名",
      nick_name: "昵稱",
      password: "密碼",
      avatar: "頭像",
      enable: "狀態",
      invitation_code: "邀請碼",
      referrer_code: "推荐人的邀請碼",
      balance: "餘額",
      tg_id: "tg id",
      role_group: "角色組",	//角色组
      orders: "訂單",     //订单
    },
    CustomerService: {
      index:"序號",
      created_at:"創建時間",
      updated_at:"更新時間",
      id:"id",
      user_id:"用戶id",
      user_name:"用戶名",
      service_status:"服務狀態",
      service_start_at:"服務開始時間",
      service_end_at:"服務結束時間",
      is_renew:"是否可續費",
      renewal_amount:"續費價格",
      goods_id:"商品id",
      subject:"商品標題",
      des:"商品描述",
      price:"商品價格",
      goods_type:"商品類型",
      duration:"訂購時長",
      total_bandwidth:"總流量",
      node_connector:"節點連接數",
      node_speed_limit:"節點速率",
      traffic_reset_day:"流量重置日",
      sub_status: "訂閱狀態",
      sub_uuid:"訂閱UUID",
      used_up:"已用上行",
      used_down:"已用下行",
    },
  },
};