/**
 * Created by zmax 
 * ArticlechannelListCtrl 频道编辑
 */
app.controller('ArticlechannelEditCtrl', ["$scope","$log","$state","$stateParams","$location","Storage","ENV","ArticlechannelService",function ($scope,$log,$state,$stateParams,$location,Storage,ENV,ArticlechannelService) {
    $log.debug("enter ArticlechannelEdit ctrl");
    //////////////前端C统一的函数包括 init addList getlocal get
    //////////////自行修改的包括：

    //////////////[统一]以下是前端C统一编写
    /**参数 0表示新建 */
    var id = $stateParams.id;
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("ArticlechannelEdit ctrl init "+id);
        if($scope.getlocal()){
            $scope.int2str();
        }else{
            $scope.get();
        }
    };
    /**
     * 获取本地对象
     * @returns {boolean} 是否取到
     */

    $scope.getlocal=function(){
        $log.debug("ArticlechannelEdit ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Articlechannel);
        }else{
            $scope.obj=Storage.get(LOCAL_TMP_OBJ);
        }
        if(null==$scope.obj)
            return false;
        //$log.debug($scope.obj);
        return true;
    };
    /**
     * 获取网络对象
     */
    $scope.get=function() {
        $log.debug("ArticlechannelEdit ctrl get id=" + id);
        if (isblank0(id)) {
            ArticlechannelService.newget().then(function (data) {
                $log.debug("ArticlechannelEdit ctrl newget then");
                $scope.obj = data;
	            $scope.int2str();
            });
        } else {
            ArticlechannelService.get(id).then(function (data) {
                $log.debug("ArticlechannelEdit ctrl get then");
                $scope.obj = data;
	            $scope.int2str();
            });
        }
    }
	/**
     * 数字转文本，要不然select无法默认
     */
    $scope.int2str = function () {
    }
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("Articlechannel ctrl save id="+id);
        $log.debug($scope.obj)
        if(isblank0(id)) {
            ArticlechannelService.create($scope.obj).then(function (data) {
                $log.debug("Articlechannel ctrl save then");
                $scope.obj=data;
                $location.path("/ArticlechannelShow/"+$scope.obj.id);
            });
        }else{
            ArticlechannelService.update($scope.obj).then(function (data) {
                $log.debug("Articlechannel ctrl update then");
                $scope.obj=data;
                $location.path("/ArticlechannelShow/"+$scope.obj.id);
            });
        }
    };
    //////////////[统一]以上是前端C统一编写

    //////////////[统一]
    $scope.init();
}]);