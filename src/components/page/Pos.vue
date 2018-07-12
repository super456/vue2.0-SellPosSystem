<template>
<div class="pos">
    <!-- 使用element-ui的组件标签 24比例-->
    <el-row>
        <!--设置行-->
        <!-- 设置列占比7行 -->
        <el-col :span="7" class="pos-order" id="order-list">
            <!-- 使用table标签 -->
            <el-tabs>
                <!-- 设置标签名称：标题 -->
                <el-tab-pane label="点餐">
                    <!-- 添加表格 -->
                    <el-table :data="tableData" border style="width:100%" height="250" stripe ref="multipleTable" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                        <el-table-column prop="count" label="数量" width="50"> </el-table-column>
                        <el-table-column prop="price" label="金额" width="70"> </el-table-column>
                        <el-table-column label="操作" fixed="right" width="100%">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                                <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="totaldiv">
                        <small>数量：</small>{{totalCount}}，<small>金额：</small>{{totalMoney}} 元
                    </div>
                    <div class="div-btn">
                        <el-button type="warning">挂单</el-button>
                        <el-button type="danger" @click="delAllGoods()">删除</el-button>
                        <el-button type="success" @click="checkout">结账</el-button>
                        <el-button type="info" @click="toggleSelection()">取消选择</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="挂单">
                    挂单
                </el-tab-pane>
                <el-tab-pane label="外卖">
                    外卖
                </el-tab-pane>
            </el-tabs>
        </el-col>
        <el-col :span="17">
            <div class="often-goods">
                <div class="title">常用商品</div>
                <div class="often-goods-list">
                    <ul>
                        <li v-for="good in oftenGoods" @click="addOrderList(good)">
                            <span>{{good.goodsName}}</span>
                            <span class="o-price">￥{{good.price}}元</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="goods-type">
                <el-tabs>
                    <el-tab-pane label="汉堡">
                        <ul class="cookList">
                            <li v-for="good in type0Goods" @click="addOrderList(good)">
                                <span class="foodImg"><img :src="good.goodsImg" width="100%"></span>
                                <span class="foodName">{{good.goodsName}}</span>
                                <span class="foodPrice">￥{{good.price}}元</span>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="小食">
                        <ul class="cookList">
                            <li v-for="good in type1Goods" @click="addOrderList(good)">
                                <span class="foodImg"><img :src="good.goodsImg" width="100%"></span>
                                <span class="foodName">{{good.goodsName}}</span>
                                <span class="foodPrice">￥{{good.price}}元</span>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="饮料">
                        <ul class="cookList">
                            <li v-for="good in type2Goods" @click="addOrderList(good)">
                                <span class="foodImg"><img :src="good.goodsImg" width="100%"></span>
                                <span class="foodName">{{good.goodsName}}</span>
                                <span class="foodPrice">￥{{good.price}}元</span>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="套餐">
                        <ul class="cookList">
                            <li v-for="good in type3Goods" @click="addOrderList(good)">
                                <span class="foodImg"><img :src="good.goodsImg" width="100%"></span>
                                <span class="foodName">{{good.goodsName}}</span>
                                <span class="foodPrice">￥{{good.price}}元</span>
                            </li>
                        </ul>
                    </el-tab-pane>

                </el-tabs>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import axios from "axios"; //哪里需要就在你来引入包
export default {
    name: "pos",
    data() {
        return {
            tableData: [],
            oftenGoods: [],
            type0Goods: [],
            type1Goods: [],
            type2Goods: [],
            type3Goods: [],
            totalMoney: 0,
            totalCount: 0,
            // 标记多选的项改变时的值
            multipleSelection: []
        };
    },
    created() {
        //拉取后台接口常用商品的数据
        axios.get("/apis/DemoApi/oftenGoods.php")
            .then(response => {
                // console.log(response);
                this.oftenGoods = response.data;
            })
            .catch(error => {
                console.log(error);
                alert("网络错误，不能访问");
            });

        //拉取后台接口类型商品数据
        axios.get("/apis/DemoApi/typeGoods.php")
            .then(response => {
                // console.log(response);
                this.type0Goods = response.data[0];
                this.type1Goods = response.data[1];
                this.type2Goods = response.data[2];
                this.type3Goods = response.data[3];
            })
            .catch(error => {
                console.log(error);
                alert("网络错误，不能访问");
            });
    },
    mounted() {
        var orderHight = document.body.clientHeight;
        document.getElementById("order-list").style.height = orderHight + "px";
    },
    methods: {
        // 添加单个商品和数量
        addOrderList(goods) {
            //判断点餐列表有无该商品，有则添加数量，无则添加进去
            let isHave = false; //默认没有该商品
            //循环遍历该点餐列表的商品id值，判断有无跟该商品id值相同
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].goodsId == goods.goodsId) {
                    //商品已经存在列表，设置该商品存在值为true
                    isHave = true;
                }
            }

            //根据该商品是否存在点餐列表，执行相应的操作
            if (isHave) {
                //改变列表中商品的数量
                //数组过滤筛选
                let arr = this.tableData.filter(o => o.goodsId == goods.goodsId);
                arr[0].count++; //数量加一
            } else {
                //商品不存在点餐列表，新增一个数据对象
                let newGoods = {
                    goodsId: goods.goodsId,
                    goodsName: goods.goodsName,
                    price: goods.price,
                    count: 1
                };
                //将新的数据添加在点餐列表对象中
                this.tableData.push(newGoods);

            }

            // 计算商品数量和总金额
            this.getAllMoneyCount();

        },
        // 删除单个商品
        delSingleGoods(goods) {
            this.tableData = this.tableData.filter(o => o.goodsId != goods.goodsId);
            this.getAllMoneyCount();
        },
        // 计算总金额和数量
        getAllMoneyCount() {
            this.totalMoney = 0;
            this.totalCount = 0;
            this.tableData.forEach(element => {
                this.totalCount += element.count;
                this.totalMoney += element.count * element.price;
            });
        },
        // 清除列表所有商品
        delAllGoods() {
            this.tableData = [];
            this.totalMoney = 0;
            this.totalCount = 0;
        },
        // 模拟结账
        checkout() {
            if (this.totalCount != 0) {
                this.tableData = [];
                this.totalMoney = 0;
                this.totalCount = 0;
                this.$message({
                    message: '结账成功，感谢你为店里出来一份力~',
                    type: 'success'
                })

            } else {
                this.$message.error("大哥，不能空结账啊");
            }
        },

        // 选择的商品列表多选框，取消所选择的项
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },//多选项存储值（选择或改变选项是调用）
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // console.log(this.multipleSelection);
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pos-order {
    /* 设置背景色 */
    background-color: #f9fafc;
    /* 设置有边框 */
    border-right: 1px solid #c0ccda;
    /* 设置高 不起作用，element-ui问题*/
    height: 100%;
}

.div-btn {
    margin-top: 10px;
}

.title {
    height: 20px;
    border-bottom: 1px solid #d3dce6;
    background-color: #f9fafc;
    padding: 10px;
    text-align: left;
}

.often-goods-list ul li {
    list-style: none;
    float: left;
    border: 1px solid #e5e9f2;
    padding: 10px;
    margin: 10px;
    background-color: #fff;
}

.o-price {
    color: crimson;
}

.cookList li {
    list-style: none;
    width: 23%;
    border: 1px solid #e5e9f2;
    height: auot;
    overflow: hidden;
    background-color: #fff;
    padding: 2px;
    float: left;
    margin: 2px;
    cursor: pointer;
}

.cookList li span {
    display: block;
    float: left;
}

.foodImg {
    width: 40%;
}

.foodName {
    font-size: 18px;
    padding-left: 10px;
}

.foodPrice {
    font-size: 16px;
    padding-left: 10px;
    padding-top: 10px;
    color: crimson;
}

.goods-type {
    clear: both;
    border-top: 1px solid #d3dce6;
}

.totaldiv {
    background-color: #fff;
    padding: 10px;
    border-bottom: 1px solid #d3dce6;
}
</style>
