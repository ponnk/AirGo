<template>
  <div class="lazy-img-container layout-pd">
    <div class="home-card-one mb15">
      <el-radio-group v-model="state.goods_type" @change="getAllEnabledGoods">
        <el-radio-button :label="constantStore.GOODS_TYPE_SUBSCRIBE" style="">
          <el-icon style="height: 100%"><Promotion /></el-icon>
          {{ $t("message.constant.GOODS_TYPE_SUBSCRIBE") }}
        </el-radio-button>
        <el-radio-button :label="constantStore.GOODS_TYPE_GENERAL">
          <el-icon><Goods /></el-icon>
          {{ $t("message.constant.GOODS_TYPE_GENERAL") }}
        </el-radio-button>
        <el-radio-button :label="constantStore.GOODS_TYPE_RECHARGE">
          <el-icon><Wallet /></el-icon>
          {{ $t("message.constant.GOODS_TYPE_RECHARGE") }}
        </el-radio-button>
      </el-radio-group>
    </div>
    <div>
      <el-card v-if="shopStoreData.goodsList.value.length > 0" style="border-radius: 1vh" class="layout-padding-auto">
        <el-row :gutter="20" align="top" >
          <el-col :xs="{span: 12 , push: 0}" :sm="12" :md="8" :lg="5" :xl="4"
                  v-for="(v, k) in shopStoreData.goodsList.value"
                  :key="k" @click="showGoodsDetails(v)">
              <el-card style=" margin-bottom: 3vh;border-radius:10px">
                <div style="width:auto; margin: auto;">
                  <el-image style="border-radius:5px" :src="v.cover_image"  fit="contain">
                    <template #error>
                      <div class="image-slot">
                        <el-icon>
                          <icon-picture />
                        </el-icon>
                      </div>
                    </template>
                  </el-image>
                </div>
                <div>
                  <div style="font-weight: bolder;font-size: clamp(1.2rem, 2vw, 1.5rem);">{{ v.subject }}</div>
                  <!--<<div style="color: #9b9da1">
                    span>{{ $t("message.adminShop.Goods.quota") }} {{ v.quota }}</span>
                    <span style="margin-left: 0.2rem">{{ $t("message.adminShop.Goods.stock") }} {{ v.stock }}</span>
                  </div>-->
                  <div class="mt15" style="text-align: right;margin-right: 0.5em;font-size: 1.4em">
                      <span style="color: red">￥</span>
                      <span style="color: red;">{{ v.price }}</span>
                  </div>
                  <br>
                </div>
              </el-card>

          </el-col>
        </el-row>
      </el-card>
      <el-empty v-else :description="$t('message.common.noData')"></el-empty>
    </div>
    <el-dialog v-model="state.isShowGoodsDetails" width="80%"
               :title="$t('message.common.details')"
               destroy-on-close>
      <el-row :gutter="50">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card style="margin-top: 10px;border-radius:10px;padding: 10px">
            <div style="margin-top: 10px;text-align: center">
              <el-image :src="shopStoreData.currentGoods.value.cover_image"
                        lazy
                        style="height: 150px"
                        fit="cover"
                        :preview-src-list="[shopStoreData.currentGoods.value.cover_image]">
                <template #error>
                  <div class="image-slot">
                    <el-icon>
                      <icon-picture />
                    </el-icon>
                  </div>
                </template>
              </el-image>
            </div>            
            <div style="margin-top: 10px;">
              {{ shopStoreData.currentGoods.value.subject }}
            </div>
          </el-card>

          <el-card style="margin-top: 10px;border-radius:10px;padding: 10px">
            <div style="margin-top: 10px;margin-bottom: 10px">
              <el-tag v-if="shopStoreData.currentGoods.value.goods_type === constantStore.GOODS_TYPE_SUBSCRIBE">
                {{ $t("message.adminShop.Goods.goods_type") }}: {{ $t("message.constant.GOODS_TYPE_SUBSCRIBE") }}
              </el-tag>
              <el-tag v-if="shopStoreData.currentGoods.value.goods_type === constantStore.GOODS_TYPE_RECHARGE">
                {{ $t("message.adminShop.Goods.goods_type") }}: {{ $t("message.constant.GOODS_TYPE_RECHARGE") }}
              </el-tag>
              <el-tag v-if="shopStoreData.currentGoods.value.goods_type === constantStore.GOODS_TYPE_GENERAL">
                {{ $t("message.adminShop.Goods.goods_type") }}: {{ $t("message.constant.GOODS_TYPE_GENERAL") }}
              </el-tag>

              <el-tag v-if="shopStoreData.currentGoods.value.deliver_type === constantStore.DELIVER_TYPE_NONE">
                {{ $t("message.adminShop.Goods.deliver_type") }}: {{ $t("message.constant.DELIVER_TYPE_NONE") }}
              </el-tag>
              <el-tag v-if="shopStoreData.currentGoods.value.deliver_type === constantStore.DELIVER_TYPE_AUTO">
                {{ $t("message.adminShop.Goods.deliver_type") }}: {{ $t("message.constant.DELIVER_TYPE_AUTO") }}
              </el-tag>
              <el-tag v-if="shopStoreData.currentGoods.value.deliver_type === constantStore.DELIVER_TYPE_MANUAL">
                {{ $t("message.adminShop.Goods.deliver_type") }}: {{ $t("message.constant.DELIVER_TYPE_MANUAL") }}
              </el-tag>
            </div>
            <div style="margin-top: 10px;margin-bottom: 10px">
              <el-tag type="warning">{{ $t("message.adminShop.Goods.quota") }}：{{ shopStoreData.currentGoods.value.quota
                }} / {{ $t("message.adminShop.Goods.stock") }}：{{ shopStoreData.currentGoods.value.stock }}
              </el-tag>
            </div>
            <el-descriptions
              :column="1"
              border
              size="small"
              direction="horizontal"
            >
              <div v-if="shopStoreData.currentGoods.value.goods_type === constantStore.GOODS_TYPE_SUBSCRIBE">
                <el-descriptions-item :label="$t('message.adminShop.Goods.total_bandwidth')">
                  {{ shopStoreData.currentGoods.value.total_bandwidth }}GB
                </el-descriptions-item>
                <el-descriptions-item :label="$t('message.adminShop.Goods.node_connector')">
                  {{ shopStoreData.currentGoods.value.node_connector }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('message.adminShop.Goods.node_speed_limit')">
                  {{ shopStoreData.currentGoods.value.node_speed_limit }}
                </el-descriptions-item>
              </div>
              <div v-if="shopStoreData.currentGoods.value.goods_type === constantStore.GOODS_TYPE_RECHARGE">
                <el-descriptions-item :label="$t('message.adminShop.Goods.recharge_amount')">
                  {{ shopStoreData.currentGoods.value.recharge_amount }}
                </el-descriptions-item>
              </div>
            </el-descriptions>
            <div style="margin-top: 10px">
                <span>
                  <span style="color: red;">￥</span>
                  <span style="color: red;font-size: 30px;">{{ shopStoreData.currentGoods.value.price }}</span>
                  <span
                    v-if="shopStoreData.currentGoods.value.goods_type === constantStore.GOODS_TYPE_SUBSCRIBE"> / {{ $t("message.common.month") }}</span>
                </span>
            </div>
          </el-card>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card style="margin-top: 10px;border-radius:10px;padding: 10px">
            <div style="margin-top: 10px;padding: 10px" v-html="shopStoreData.currentGoods.value.des"></div>
          </el-card>
        </el-col>
      </el-row>
      <template #footer>
				<span>
					<el-button @click="state.isShowGoodsDetails = false"
                     size="default">{{ $t("message.common.button_cancel") }}
          </el-button>
					<el-button type="primary"
                     :disabled="shopStoreData.currentGoods.value.stock <= 0"
                     @click="openPurchase()"
                     size="default">{{ $t("message.adminShop.purchase") }}
          </el-button>
				</span>
      </template>
    </el-dialog>
    <Purchase ref="PurchaseRef"></Purchase>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref, defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";

import { useShopStore } from "/@/stores/user_logic/shopStore";
import { storeToRefs } from "pinia";
import { useConstantStore } from "/@/stores/constantStore";

const shopStore = useShopStore();
const shopStoreData = storeToRefs(shopStore);
const constantStore = useConstantStore();
const Purchase = defineAsyncComponent(() => import("/@/views/shop/purchase.vue"));
const PurchaseRef = ref();

// 定义变量内容
const router = useRouter();
const state = reactive({
  isShowGoodsDetails: false,
  isShowLoading: false,
  goods_type: constantStore.GOODS_TYPE_SUBSCRIBE
});

const showGoodsDetails = (v: Goods) => {
  shopStoreData.currentGoods.value = v;
  state.isShowGoodsDetails = true;
};
const openPurchase = () => {
  state.isShowGoodsDetails = false;
  state.isShowLoading = true;
  shopStoreData.currentOrder.value.duration = 1; // 默认订购时长
  shopStoreData.currentOrder.value.order_type = constantStore.ORDER_TYPE_NEW; //订单类型：新购入
  shopStoreData.currentOrder.value.goods_id = shopStoreData.currentGoods.value.id; //订购商品ID

  PurchaseRef.value.openDialog(constantStore.ORDER_TYPE_NEW);
};
const getAllEnabledGoods = () => {
  shopStore.getAllEnabledGoods({ goods_type: state.goods_type });
};
// 页面加载时
onMounted(() => {
  getAllEnabledGoods();
});


</script>