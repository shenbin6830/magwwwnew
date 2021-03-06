/**
 * OrderrQuestionviewShow，订单之一对一问题观看详细
 */
app.controller('OrderrQuestionviewShowCtrl', ["$scope","$log","$state","$stateParams","Storage","ENV","OrderrQuestionviewService",function ($scope,$log,$state,$stateParams,Storage,ENV,OrderrQuestionviewService) {
    $log.debug("enter OrderrQuestionviewShow ctrl");
    //////////////前端C统一的函数包括 init addList getlocal get
    //////////////自行修改的包括：

    //////////////[统一]以下是前端C统一编写
    /**参数*/
    var id = $stateParams.id;
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("OrderrQuestionviewShow ctrl init "+id);
        $scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("OrderrQuestionviewShow ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_OrderrQuestionview);
        }else{
            $scope.obj=Storage.get(LOCAL_TMP_OBJ);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function() {
        $log.debug("OrderrQuestionviewShow ctrl get id=" + id);
        if (isblank0(id)) {
            OrderrQuestionviewService.newget().then(function (data) {
                $log.debug("OrderrQuestionviewShow ctrl newget then");
                $scope.obj = data;
            });
        } else {
            OrderrQuestionviewService.get(id).then(function (data) {
                $log.debug("OrderrQuestionviewShow ctrl get then");
                $scope.obj = data;
            });
        }
    }
    //////////////[统一]以上是前端C统一编写

    //////////////[统一]
    $scope.init();
}]);