(function (angular) {
	'use strict';
	var app = angular.module('zwAPP', ['ngRoute']);//引用路由模块
	// Your starting point. Enjoy the ride!
	app.config(['$routeProvider',function($routeProvider) {
		$routeProvider
		.when('/:status?',{
			controller:"maincontroller",
			templateUrl:"main"	
		})
		.otherwise({
			controller:"maincontroller",
			templateUrl:"main"	
		});		
	}])
	app.controller('maincontroller', ['$scope', '$routeParams', function($scope,$routeParams){
		//展示todos  ，文字和完成的标识
		$scope.todos = [{
			id:1,
			text:"吃饭",
			completed:true
		},
		{
			id:2,
			text:"睡觉",
			completed:false
		},	
		{
			id:3,
			text:"敲代码",
			completed:false
		}];

		//显示未完成的条目数
		$scope.todoCount =  function() {
			// body...
			var count = 0;
			for(var i=0; i<$scope.todos.length; i++){
				if(!$scope.todos[i].completed){
					++count;
				}
			}
			return count;
		}

			//新增数据
			$scope.text = "";
			var todoID = 3;
				// body...
			// $scope.addtodo1 = function () {
			// 	if ($scope.text.trim().length===0) {
			// 		return ;
			// 	}
			// 	var obj = {
			// 		id:++todoID,
			// 		text:$scope.text,
			// 		competed:false
			// 	}
			// 	$scope.todos.push(obj);
			// 	//这里必须执行下条目书数的重新计算，和输入框的清空
			// 	$scope.todoCount();
			// 	$scope.text = "";

			// }
			// 


				// 这是同过v传值event，用keyCode判断执行，推荐应form表单特性，ng—onsubmit
				$scope.addtodo2 = function (event) {
					if ($scope.text.trim().length===0) {
						return ;
					}
					if (13===event.keyCode) {
						var obj = {
							id:++todoID,
							text:$scope.text,
							completed:false
						}
						$scope.todos.push(obj);
				//这里必须执行下条目书数的重新计算，和输入框的清空
				// $scope.todoCount();
				$scope.text = "";
			}
		}


			//点击x按钮删除
			$scope.removetodo = function(id){
				// body..
				for (var i = 0; i < $scope.todos.length; i++) {
					if ($scope.todos[i].id===id) {
						$scope.todos.splice(i,1);	//这里做数组的删除，用Array.splice（开始，数量，替换内容）方法					
					}
				};
			}
			//显示隐藏清空按钮
			$scope.showBtn = function(){
				// console.log($scope.todoCount());
				//这里是判断数组总长与未完成的长的是否相等做为逻辑的，相等就代表没有完成的事件，为false不显示
				if ($scope.todos.length!=$scope.todoCount()) {
					return true;
				}
				return false;
			}
			//清除已完成
			$scope.clearAll = function(){
				// console.log("事件有效");
				var newTodos=[];
				for (var i = 0; i < $scope.todos.length; i++) {
					// console.log($scope.todos[i].completed);
					if(!$scope.todos[i].completed){
						newTodos.push($scope.todos[i]);
					}
				};
				// console.log(newTodos);
				$scope.todos = newTodos;
			}
			//双击可编辑
			//还需要做能自动获取到光标。。。。。。未作
			$scope.currentID = -1;
			$scope.dbchange = function(id) {
				// body...
				$scope.currentID = id ;
			}
			$scope.save = function(){

			//enter	保存
				$scope.currentID = -1;
			}


			//全选/全不选
			var newCompleted=true;
			$scope.toggleAll=function(){
				for (var i = 0; i < $scope.todos.length; i++) {
					$scope.todos[i].completed=newCompleted;
				};
				newCompleted = !newCompleted;
			}

			//选项卡功能
			$scope.selector = {};
			var status = $routeParams.status;
			console.log(status);
			if (!status) {
				return;
			}
			switch(status){
				case "completed":
				$scope.selector = {
					completed:true
				};
				break;
				case "active":
				$scope.selector = {
					completed:false
				};
				break;	
				default:
				$scope.selector = {};
				break;
			}
			console.log($scope.selector.completed);

		}]);
})(angular);
