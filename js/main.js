var app = angular.module("myApp", ["ui.router"]);
app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider
		.when("", "/star");
	$stateProvider
		.state("login", {
			url: "/login", //设置地址栏的地址
			templateUrl: "html/login.html", //将要加载的模块页面地址
		})
		.state("quicklogin", {
			url: "/quicklogin",
			templateUrl: "html/quicklogin.html",
		})
		.state("register", {
			url: "/register",
			templateUrl: "html/register.html"
		})
		.state("home", {
			url: "/home",
			cache:"false",
			templateUrl:"html/home.html",
			controller:"testCtrl"
		})
		.state("community", {
			url: "/community",
			templateUrl: "html/community.html"
		})
		.state("selfCenter", {
			url: "/selfCenter",
			templateUrl: "html/selfCenter.html"
		})
		.state("shopCart", {
			url: "/shopCart",
			templateUrl: "html/shopCart.html"
		})
		.state("details", {
			url: "/details",
			templateUrl: "html/details.html"
		})
		.state("star", {
			url: "/star",
			templateUrl: "html/star.html"
		})
		.state("comment", {
			url: "/details/comment",
			templateUrl: "html/comment.html"
		})
})
app.controller("mm", function($scope, $location, $http, $sce, $timeout) {
	showBanner($scope, $location, $http);
	showQiangGou($scope, $location, $http, $sce);
	qiangGouDao($scope, $http, $timeout);
	$scope.show1 = true;
	$scope.show2 = false;
	
				
				
				
	$scope.showJ = function() {
		$scope.show1 = true;
		$scope.show2 = false;
	};
	$scope.showM = function() {
		$scope.show1 = false;
		$scope.show2 = true;
	};
	$scope.jumpPage = function(page) {
		$page = "<div/>";
		$page.addClass("jumpPage");
	}
	//跳转到首页
	$scope.goHome = function() {
		$location.path("/home");
		showBanner($scope, $location, $http);
		showQiangGou($scope, $location, $http, $sce);
		qiangGouDao($scope, $http, $timeout);
	}
	//启动页面自动跳转到首页
	$scope.startOver = function() {
		$timeout(function() {
			$location.path("/home");
		}, 2000)
	}
	//跳转到社区
	$scope.goComm = function() {
		$location.path("/community")
	}
	//跳转到购物车
	$scope.goCart = function() {
		$location.path("/shopCart")
	}
	//跳转到个人中心
	$scope.goCenter = function() {
		$location.path("/selfCenter")
	}
	//社区的数据请求
	/*$http.get("shequ.txt").success(function(data) {
		$scope.shequ = data;
	})*/
	//跳转到快捷登录
	$scope.goquicklogin = function() {

		$location.path("/quicklogin");
	}
	//跳转到快捷注册
	$scope.goregister = function() {

		$location.path("/register");
	}
	//跳转到详情页
	$scope.detailgoods = function() {
		$location.path("details/comment");
		//$scope.="这是首页"
	};
	//跳转到评论详情页
	$scope.commentgoods = function() {
		$location.path("details");
		//$scope.="这是首页"
	};
	//分享弹框
	$scope.toshare = function() {

		$(".am-share").addClass("am-modal-active");
		if($(".sharebg").length > 0) {
			//console.log($(".sharebg").length);
			$(".sharebg").addClass("sharebg-active");
		} else {
			setTimeout(function() {
				$("body").append('<div class="sharebg" ng-click="ck()"></div>');
				//$(".sharebg").css({"display":"block"});
				$(".sharebg").addClass("sharebg-active");
			}, 300);
			$(".sharebg").click(function() {
				console.log(1);
			})
		}
		/*$scope.ck=function(){
				$(".am-share").removeClass("am-modal-active");
			setTimeout(function() {
				
				$(".sharebg-active").removeClass("sharebg-active");
				$(".sharebg").remove();
			}, 300);
			}*/
		$(".am-share-footer").click(function() {
			console.log(1);
			$(".am-share").removeClass("am-modal-active");
			setTimeout(function() {

				$(".sharebg-active").removeClass("sharebg-active");
				$(".sharebg").remove();
			}, 300);
		})

	}
	var onOff = true;
	$scope.quickgohome2 = function() {

		if(onOff) {
			$(".login-quickgohome").addClass("active");
			onOff = !onOff;
		} else {
			$(".login-quickgohome").removeClass("active");
			onOff = !onOff;
		}
	}
	
	
	var onOffsel = true;
	$scope.selbtnedit=function(){
		
		if(onOffsel) {
			$(".shopCart-select").addClass("icon-xuanzhong");
		$(".shopCart-select").css({"border":"none"});
			onOffsel = !onOffsel;
		} else {
			$(".shopCart-select").removeClass("icon-xuanzhong");
		$(".shopCart-select").css({"border":"0.02rem solid #ddd"});
			onOffsel = !onOffsel;
		}
		
		
		
	}
	
	
	var onOffeditshopcart=true;
				$scope.edit=function(){
					if(onOffeditshopcart){
					$("#shopCart-edit").text("完成");
					$("#shopCart-editnum").show();
					$("#shopCart-editx").hide();
					$("#shopCart-del").show();
					$("#shopCart-stotal").hide();
					$("#shopCart-stotaldel").show();
					$("#shopCart-heji").hide();
					onOffeditshopcart=!onOffeditshopcart;
				}else{
					$("#shopCart-edit").text("编辑");
					$("#shopCart-editnum").hide();
					$("#shopCart-editx").show();
					$("#shopCart-del").hide();
					$("#shopCart-stotal").show();
					$("#shopCart-stotaldel").hide();
					$("#shopCart-heji").show();
					onOffeditshopcart=!onOffeditshopcart;
				}
				}

	$scope.login = function() {
		//$(".comm-dlcolor").addClass("comm-colorc");

		var rephone = /^1[3|4|5|7|8]\d{9}$/; //手机号
		var repass = /^[a-z0-9_-]{6,18}$/; //6到18位的字母大小写、数字下划线、横杠	

		var phonenum = $(".login-userphonenum").val();
		var phonepassword = $(".login-phonepassword").val();
		if(phonenum != "" && phonepassword != "") {
			if(rephone.test(phonenum)) {
				if(repass.test(phonepassword)) {

					$(".login-error").html("登录成功");

					localStorage.setItem("userphone", phonenum);
					$(".login-error").addClass("show");
					$timeout(function() {
						$(".login-error").removeClass("show");

					}, 2000);

				} else {
					$(".login-error").html("密码格式不正确");
					$(".login-error").addClass("show");
					$timeout(function() {
						$(".login-error").removeClass("show");

					}, 2000)
				}

			} else {
				$(".login-error").html("手机号格式不正确");
				$(".login-error").addClass("show");
				$timeout(function() {
					$(".login-error").removeClass("show");

				}, 2000)
			}

		} else {
			$(".login-error").html("账号/密码不能为空");
			$(".login-error").addClass("show");
			$timeout(function() {
				$(".login-error").removeClass("show");

			}, 1000)
		}

	}
	var onOffpass = true;
	$scope.showpass = function() {
		if(onOffpass) {
			$(".comm-showpass").removeClass("icon-visible").addClass("icon-invisible");
			$(".login-password").attr("type", "text");
			onOffpass = !onOffpass;
		} else {
			$(".comm-showpass").removeClass("icon-invisible").addClass("icon-visible");
			$(".login-password").attr("type", "password");
			onOffpass = !onOffpass;
		}

	}
	$http.get("data/shequ.txt?callback=JSON_CALLBACK").success(function(data) {
		$scope.list = [];
		$scope.talklist = []
		for(var i in data) {
			var x = new Date(data[i].create_time * 1000);
			var create_time = x.toLocaleString();
			var keylist = [];
			var key1 = data[i].keyword.split(",");
			for(var j in key1) {
				var it = key1[j];
				keylist.push(it);
			}
			$scope.key1 = key1;
			var item = {
				thumb: data[i].thumb,
				name: data[i].name,
				content: data[i].content,
				keyword:data[i].keyword,
				create_time: create_time,
				praise_num: data[i].praise_num,
				collect_num: data[i].collect_num,
				comment_num: data[i].comment_num,
				url: data[i].images[0].image,
				country_name: data[i].images[0].tags[0].country_name,
				buy_address: data[i].images[0].tags[0].buy_address,
				brand_name: data[i].images[0].tags[0].brand_name,
				produce_name: data[i].images[0].tags[0].produce_name,
				talkname: data[i].comment_list[0].name,
				talkcontent: data[i].comment_list[0].content,
				talkname1: data[i].comment_list[1].name,
				talkcontent1: data[i].comment_list[1].content,
				talkname2: data[i].comment_list[2].name,
				talkcontent2: data[i].comment_list[2].content,
				commit: data[i].comment_list
			}
			$scope.list.push(item);
		}

	})
		$http.get("data/detail.txt").success(function(data) {
		
		$scope.banner = [];
		$scope.detaillist = [];
		$scope.commentList = [];
		//$scope.detailComments=[];
		//console.log(data);
		var listImg = data[0].produce_images;
		var listUrl = data[0].produce_detail;
		var listEvaluation = data[0].one_evaluation;
		var detailComments = data[0].evaluation;
		// console.log(detailComments);
		$scope.goodsComment = detailComments;
		//console.log(listEvaluation.evaluation);

		for(var m in listUrl) {
			var item = {
				detailurl: listUrl[m]
			}
			$scope.detaillist.push(item);
		}
		// console.log($scope.detaillist)

		for(var i in listImg) {
			var item = {
				img: listImg[i]
			};
			$scope.banner.push(item);
		}

		for(var i in $scope.goodsComment) {
			var item = {
				commentUrl: detailComments[i].header_img,
				commentName: detailComments[i].name,
				commentTime: detailComments[i].create_time,
				commentContent: detailComments[i].content

			};
			$scope.commentList.push(item);
			//console.log( $scope.commentList);
		}
		$scope.detailArea = listEvaluation.evaluation;
		$scope.detailCount = listEvaluation;
		$scope.goodsInfor = data[0];
		//console.log($scope.goodsInfor);

		var onOff = true;
		$scope.detailpraise = function() {
			if(onOff) {
				$(".icon-like").css({
					"color": "#ff2d00"
				});
				showText("点赞成功");
			} else {
				$(".icon-like").css({
					"color": "#646464"
				});
				showText("取消成功");
			}
			onOff = !onOff;
		}
		setTimeout(function() {
			var swiper = new Swiper(".swiper-container", {
				autoplay: 5000,
				loop: true,
				//pagination: ".swiper-pagination"
			});
		}, 10);

		var onOff = true;
		$scope.quickgohome2 = function() {

			if(onOff) {
				$(".comment-quickgohome").addClass("active");
				onOff = !onOff;
			} else {
				$(".comment-quickgohome").removeClass("active");
				onOff = !onOff;
			}
		}

		var num = 0;
		$scope.detailAddcar = function() {
			num++;
			$(".detail-count").show().text(num);
			showText("小主，宝贝已经在车车里等你了哦");
		}

	}).error(function() {
		//console.log(1);
	})
});

app.controller("testCtrl",function($scope){})
//防止转义
app.filter('to_trusted', ['$sce', function($sce) {
	return function(text) {
		return $sce.trustAsHtml(text);
	};
}]);

//banner,country数据渲染
function showBanner($scope, $location, $http) {
	$http.get("data/data.txt").success(function(data) {
		$scope.homeBanner = data[0].banner;
		$scope.homeC = data[0].country;
		setTimeout(function() {
			var swiper1 = new Swiper(".swiper-container1", {
				autoplay: 2000,
				loop: true,
				pagination: ".swiper-pagination",
				autoplayDisableOnInteraction: false,
				paginationClickable: true
			});
		}, 10);
		setTimeout(function() {
			var swiper2 = new Swiper(".swiper-container2", {
				autoplayDisableOnInteraction: false,
				paginationClickable: true,
				slidesPerView: 3,
				spaceBetween: 20,
				effect: "slide"

			});
		}, 10);
	});
};
//抢购，选项卡数据渲染

function showQiangGou($scope, $location, $http, $sce) {
	$http.get("data/data.txt").success(function(data) {
		var qianggou = data[0].qianggou[0];
		$scope.qiangList = qianggou.produce_list;
		var xuanX = data[0].xuanxk;

		$scope.xuanXList = data[0].xuanxk;
		setTimeout(function() {
			var swiper3 = new Swiper(".swiper-container3", {
				autoplayDisableOnInteraction: false,
				paginationClickable: true,
				slidesPerColumn: 2,
				prevButton: '.swiper-button-prev',
				nextButton: '.swiper-button-next',
				onSlideChangeEnd: function(swiper, even) {
					if(swiper.activeIndex == 0) {
						$scope.show1 = true;
						$scope.show2 = false;
					} else {
						$scope.show1 = false;
						$scope.show2 = true;
					}
				}
			});
		}, 10);
		$scope.themeList1 = data[0].themeBrick;
		$scope.lastList = data[0].lastgoods;
	});
};
app.filter("to_price", function() {
	return function(text2) {
		text2 = text2 * 1 / 100;
		return text2;
	}
});
//倒计时
function qiangGouDao($scope, $http, $timeout) {
	$http.get("data/data.txt").success(function(data) {
		var qianggou = data[0].qianggou[0];

		$scope.xuanXList = data[0].xuanxk;

		for(var i in $scope.xuanXList) {

			var a = $scope.xuanXList[i].last_time;
			loopF(a, i);
		}

		function loopF(a, i) {
			$timeout(function() {
				a = a * 1 - 1000
				$scope.xuanXList[i].time = {
					"hour": Math.floor(a / (1000 * 60 * 60)) % 24, //小时
					"minutes": Math.floor(a / (1000 * 60)) % 60, //分钟
					"seconds": Math.floor(a / 1000) % 60 //秒 
				};
				if(a > 1000) {
					loopF(a, i);
				}
			}, 1000);
		};

		loopD(qianggou.last_time);

		function loopD(a) {
			$timeout(function() {
				a = a * 1 - 1000
				$scope.times = {
					"hour": Math.floor(a / (1000 * 60 * 60)) % 24, //小时
					"minutes": Math.floor(a / (1000 * 60)) % 60, //分钟
					"seconds": Math.floor(a / 1000) % 60 //秒 
				};
				if(a > 1000) {
					loopD(a);
				}
			}, 1000);
		};
	});
};


//定义提示框
function showText(txt, time) {
	var times = 1500;
	if(arguments[1]) {
		times = time;
	}
	var tip = $('<p class="tip"></p>'); //创建提示文字容器dom对象
	tip.text(txt); //将提示文字赋值到tip对象当中
	$("body").append(tip); //将提示文字容器添加到body当中

	setTimeout(function() { //设置定时器,10毫秒,避免浏览器认为tip对象一开始的opacity属性值就为1
		tip.addClass("show"); //添加opacity属性为1的class名,由于元素本身已定义过渡动画,所以此处无需关系显示动画效果
	}, 10);

	setTimeout(function() { //设置提示文字显示时间,
		tip.removeClass("show"); //删除opacity为1的class,此时容器对象的opacity值重新归为0
		setTimeout(function() { //预留提示文字容器对象消失动画时间,当动画执行完之后,再来删除当前对象
			tip.remove(); //删除提示文字容器对象
		}, 1000);
	}, times);
}
