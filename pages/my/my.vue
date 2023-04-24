<template>
	<view class="wrap">
		<u-row gutter="16">
			<u-col span="3">
				<view class="demo-layout bg-purple"></view>
			</u-col>
			<u-col span="4">
				<view class="demo-layout bg-purple-light"></view>
			</u-col>
			<u-col span="5">
				<view class="demo-layout bg-purple-dark"></view>
			</u-col>
		</u-row>
		<u-row gutter="16" justify="space-between">
			<u-col span="3">
				<view class="demo-layout bg-purple"></view>
			</u-col>
			<u-col span="9">
				<view class="demo-layout bg-purple-light"></view>
			</u-col>
		</u-row>
		<view>{{title}}</view>
		<button @click="getListTxt()">的撒旦撒旦</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				arr:[],
				index:0
			}
		},
		onLoad() {
          this.fetchFileData()
		},
		methods: {
			getListTxt(){
				 let  url1 =  this.arr[this.index]
				   uni.request({
				     url: 'https://eeapi.cn/api/video/32E709A9A6009ED467400BA6B7D7CA858F53B2B7A058186998/2192', 
				 	data:{
				 		url:url1
				 	},
				     success: (res) => {
				 		console.log(res)
				 		this.title = res.data.data.title
				 		this.downloadFile(res.data.data.video)
				 		this.index++;
				 		console.log(this.index)
				     },
				 	
				 });
			},
			// 读取本地文件的方法 参数1为文件名称，参数2为回调方法用于处理获取到的文件数据
			fetchFileData(fileName = 'cs.txt',callback) {
				let that = this;
				plus.io.requestFileSystem(
					plus.io.PUBLIC_DOWNLOADS, // 文件系统中的根目录
					fs => {
						// 创建或打开文件, fs.root是根目录操作对象,直接fs表示当前操作对象
						fs.root.getFile(fileName, {
							create: true // 文件不存在则创建
						}, fileEntry => {
							// 文件在手机中的路径
							console.log('文件在手机中的路径', fileEntry.fullPath)
							fileEntry.file(function(file) {
								var fileReader = new plus.io.FileReader();
								console.log("getFile:" + JSON.stringify(file));
								fileReader.readAsText(file, "utf-8")
								fileReader.onloadend = function(res) { //读取文件内容成功后的回调事件
									//res.target.result读取到的文件内容信息
									//console.log('res=====',res)
								    var arr= res.target.result.split("\n");
									that.arr = arr;
								    console.log('arr====',that.arr)
									callback(res.target.result)
								}
							});
						}, e => {
							console.log('报错111', "getFile failed: " + e.message);
						});
					},
					e => {
						console.log('报错222', e.message);
					}
				);
			},
		}
	}
</script>

<style scoped lang="scss">
	// @import "uview-ui/index.scss";

	.wrap {
		padding: 24rpx;
	}

	.u-row {
		margin: 40rpx 0;
	}

	.demo-layout {
		height: 80rpx;
		border-radius: 8rpx;
	}

	.bg-purple {
		background: #d3dce6;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}
</style>
