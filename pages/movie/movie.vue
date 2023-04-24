<template>
	<view>
		<button @click="daowlowdTxt()">下载txt</button>
		<view class="progress-container" v-if="isShowProgress">
			<view class="progress-box">
				<view class="text">文件下载中，请稍后......</view>
				<progress :percent="progress" show-info stroke-width="3" />
			</view>
		</view>
		<!-- <view class="jianji">
			<image src="../../static/beij.png">
		</view> -->
		<view>
			<button  @click="getListTxt()">获取视频</button>
			<span style="font-size: 10px;">{{title}}</span>
		</view>
	</view>
</template>

<script>

      export default {
		data() {
			return {
				url: '',
				isShowProgress: false,
				progress: 0,
				title:'',
				wenan:'',
				arr:[],
				index:0
			}
		},
		components: {
			
		},
		onReady() {
			
		},
		methods: {
			daowlowdTxt(){
				// 删除原来的
				this.deletes()
				uni.showLoading({
				   title: '正在下载'
				});
				// 本地路径开头使用file://，跟上手机文件本地目录storage/emulated/0，
				// 这时用户文件管理器能看到的了，之后创建 连信 作为文件夹，
				// 后缀是用于文件命名和格式修改，大家可以使用变量。
				let that = this;
				var url = 'http://vip.cyhxvip.com/cs.txt';
				let dtask = plus.downloader.createDownload(url, {
					filename: "file://storage/emulated/0/Android/data/io.dcloud.HBuilder/downloads/" + 'cs.txt' //利用保存路径，实现下载文件的重命名
				},(d, status)=> {
					//d为下载的文件对象
					if (status == 200) {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							mask: true,
							title: '已保存到文件夹：/downloads/' + 'cs.txt', //保存路径
							duration: 3000,
						});
						
						//下载成功,d.filename是文件在保存在本地的相对路径，使用下面的API可转为平台绝对路径
						let fileSaveUrl = plus.io.convertLocalFileSystemURL(d.filename);
						setTimeout(()=>{
							that.fetchFileData();
							plus.runtime.openFile(d.filename); //选择软件打开文件
						},1500)
					} else {
						//下载失败
						uni.hideLoading();
						plus.downloader.clear(); //清除下载任务
						uni.showToast({
							icon:'none',
							mask:true,
							title: '下载失败，请稍后重试',
						});
					}
				})
				dtask.start();
				
				// uni.downloadFile({
				// 		url: 'http://vip.cyhxvip.com/cs.txt',//下载资源的 url
				// 		success: res => {
				// 			console.log(res);
				// 			if (res.statusCode === 200) {
				// 				console.log('下载成功');
				// 			}
				// 			console.log(res.tempFilePath);
				// 			//文件保存到本地
				// 			uni.saveFile({
				// 				tempFilePath: res.tempFilePath, //临时路径
				// 				success: function(res) {
				// 					console.log(res);
				// 					uni.showToast({
				// 						icon: 'none',
				// 						mask: true,
				// 						title: '文件已保存：' + res.savedFilePath, //保存路径
				// 						duration: 3000
				// 					});
				// 					setTimeout(() => {
				// 						//打开文档查看
				// 						uni.openDocument({
				// 							filePath: res.savedFilePath,
				// 							success: function(res) {
				// 								console.log('打开文档成功');
				// 							},
				// 							fail: function() {
				// 								console.log('打开失败');
				// 							}
				// 						});
				// 					}, 3000);
				// 				},
				// 				fail: function() {
				// 					console.log('保存失败');
				// 				}
				// 			});
				// 		},
				// 		fail: function() {
				// 			console.log('下载失败');
				// 			uni.showToast({
				// 				icon: 'none',
				// 				mask: true,
				// 				title: '失败请重新下载'
				// 			});
				// 		}
				// 	});
			},
	       async getListTxt(){
			     let aaa = await this.fetchFileData();
			      let  url1 = aaa[this.index]
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
			        },
					
			    });
			},
			downloadFile(url1) {
				const downloadTask = uni.downloadFile({
					url: url1,
					success: res => {
						if (res.statusCode === 200) {
							this.isShowProgress = false;
							console.log('下载成功');
						}
						let that = this;
						console.log('aaaa'+res.tempFilePath)
						uni.saveFile({
							//console.log(res.tempFilePath)
							tempFilePath: res.tempFilePath,
							success: function(red) {
								that.isShowProgress = false;
								uni.showModal({
								    title: '提示',
								    content: '文件已保存：' + red.savedFilePath,
									cancelText: '我知道了',
									confirmText: '打开文件',
								    success: function (res) {
								        if (res.confirm) {
								            uni.openDocument({
								            	filePath: red.savedFilePath,
								            	success: (sus) => {
								            		console.log('成功打开');
								            	}
								            })
								        }
								    }
								});
							}
						});
					}
				})
				downloadTask.onProgressUpdate((res) => {
					if(res.progress > 0) {
						this.isShowProgress = true;
					}
					this.progress = res.progress;
					console.log('下载进度：' + res.progress);
					console.log('已下载长度：' + res.totalBytesWritten);
					console.log('文件总长度：' + res.totalBytesExpectedToWrite);
				})
				uni.showLoading({
				   title: '正在下载'
				});
				// 本地路径开头使用file://，跟上手机文件本地目录storage/emulated/0，
				// 这时用户文件管理器能看到的了，之后创建 连信 作为文件夹，
				// 后缀是用于文件命名和格式修改，大家可以使用变量。
				var url = url1;
				let dtask = plus.downloader.createDownload(url, {
					filename: "file://storage/emulated/0/DCIM/sp/" + '1.mp4' //利用保存路径，实现下载文件的重命名
				},(d, status)=> {
					//d为下载的文件对象
					if (status == 200) {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							mask: true,
							title: '已保存到文件夹：/sp/' + '1.mp4', //保存路径
							duration: 3000,
						});
						//下载成功,d.filename是文件在保存在本地的相对路径，使用下面的API可转为平台绝对路径
						let fileSaveUrl = plus.io.convertLocalFileSystemURL(d.filename);
						setTimeout(()=>{
							plus.runtime.openFile(d.filename); //选择软件打开文件
						},1500)
					} else {
						//下载失败
						uni.hideLoading();
						plus.downloader.clear(); //清除下载任务
						uni.showToast({
							icon:'none',
							mask:true,
							title: '下载失败，请稍后重试',
						});
					}
				})
				dtask.start();
			},
			// 读取本地文件的方法 参数1为文件名称，参数2为回调方法用于处理获取到的文件数据
			fetchFileData(fileName = 'cs.txt',callback) {
				let that = this;
				return new Promise((resovle,reject)=>{
					plus.io.requestFileSystem(
						plus.io.PUBLIC_DOWNLOADS, // 文件系统中的根目录
						fs => {
							// 创建或打开文件, fs.root是根目录操作对象,直接fs表示当前操作对象
							fs.root.getFile(fileName, {
								create: false // 文件不存在则创建
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
									    let arr= res.target.result.split("\n");
										resovle(arr)
									    //console.log('arr====',that.arr)
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
				})
			},
			
		
			// 复制文本到粘贴板
		  copy(value) {
			//提示模板
			uni.showModal({
			  content: value, //模板中提示的内容
			  confirmText: '复制内容',
			  success: (res) => { //点击复制内容的后调函数
				if (res.confirm) {
				  uni.setClipboardData({
					data: value, //要被复制的内容
					success: () => { //复制成功的回调函数
					  uni.$showMsg('复制成功')
					}
				  });
				} else if (res.cancel) {
				  console.log('用户点击取消');
				}
			  }
			});
		  },
		  deletes(){
					  //console.log("删除文件") 
					  plus.io.requestFileSystem(plus.io.PUBLIC_DOCUMENTS, (fs)=> {
						  // fs.root是根目录操作对象DirectoryEntry
						  let a = 'file://storage/emulated/0/Android/data/io.dcloud.HBuilder/downloads';
						  //删除目录不能指向文件名  只能指向文件夹
						  console.log(a+'/box/')
						  plus.io.resolveLocalFileSystemURL(a ,(entry)=> {
							  //读取这个目录对象
							  var directoryReader = entry.createReader();
							  //读取这个目录下的所有文件
							  directoryReader.readEntries((entries)=> {
								  console.log(entries.length)
								  //如果有才操作
								  console.log(entries, 'entries')
								  if (entries.length > 0) {
									  //删除目录将会删除其下的所有文件及子目录 不能删除根目录，如果操作删除根目录
									  //将会删除目录下的文件及子目录，不会删除根目录自身。 删除目录成功通过succesCB
									  //回调返回，失败则通过errorCB返回。
									  entry.removeRecursively((entry)=> {
									   
										  console.log('删除成功回调')
										  //删除成功回调
										  this.resultdata=[]
										 
									  }, (e) =>{
										  //错误信息
										  console.log(e.message + ' ?!')
									  })
								  }
							  })
						  })
			 
			  })
		             
		                 
		     },
		 		 			
		}
	}
</script>

<style lang="scss">
	
</style>
