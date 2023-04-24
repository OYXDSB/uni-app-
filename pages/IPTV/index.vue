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
		onShow() {
			let aa  = this.readJsonByFile('storage/emulated/0/Download/xz/cs.txt');
		},
		methods: {
			daowlowdTxt(){
				// 删除原来的
				this.deletes()
				uni.showLoading({
				   title: '正在下载',
				});
				// 本地路径开头使用file://，跟上手机文件本地目录storage/emulated/0，
				// 这时用户文件管理器能看到的了，之后创建 连信 作为文件夹，
				// 后缀是用于文件命名和格式修改，大家可以使用变量。
				let that = this;
				var url = 'http://vip.cyhxvip.com/cs.txt';
				let dtask = plus.downloader.createDownload(url, {
					filename: "file://storage/emulated/0/Download/xz/" + 'cs.txt' //利用保存路径，实现下载文件的重命名
				},(d, status)=> {
					//d为下载的文件对象
					if (status == 200) {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							mask: true,
							title: '已保存到文件夹：/storage/emulated/0/Download/xz/' + 'cs.txt', //保存路径
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
	        getListTxt(){
			     let aaa =  this.readJsonByFile('/storage/emulated/0/Download/xz/cs.txt');
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
		 readJsonByFile(fileNamePath) {
				// 只能用于安卓 导入java类
				const File = plus.android.importClass('java.io.File')
				const BufferedReader = plus.android.importClass('java.io.BufferedReader')
				const FileReader = plus.android.importClass('java.io.FileReader')
				const FileWriter = plus.android.importClass('java.io.FileWriter')
				// 安卓11以下 /sdcard/自己的文件夹/1.txt
				// 安卓11 建议用 /storage/emulated/0/Download/自己的文件夹/1.txt
				// 读取txt文件 readFile ("/sdcard/修止符/配置.json")
				const readFile = (fileName) => {
					const readFr = new File(fileName)
					console.log(readFr)
					try {
						const reader = new BufferedReader(new FileReader(readFr))
						console.log(reader)
						let txt
						let retxt =[]
						let flag = true
						while (flag) {
							txt = reader.readLine() // 读取文件
							if (txt == null) {
								console.log(111)
								flag = false
								break
							}
							retxt.push(txt)
						}
						return retxt
					} catch (e) {
						console.log(e)
						return ''
					}
				}
				//const settingJsonPath = '/sdcard/wisdomApp/settingJson.txt'
				const json = readFile(fileNamePath)
				return json
			},
		
			  // 解析文本框链接
			replaceSrc(txt) {
				 let index = txt.indexOf('h');
				  let aa = txt.substring(0,index)
				 return aa;
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
				  let a = 'file://s/storage/emulated/0/Download/xz';
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
