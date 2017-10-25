Ext.define('Demo.dashboard.Main', {extend:'Ext.grid.Panel', xtype:'dashboardmain', controller:'dashboardmain', title:'Dashboard', store:{type:'users'}, columns:[{text:'Name', dataIndex:'name', flex:1}, {text:'Email', dataIndex:'email', flex:1, cell:{userCls:'demo-dashboard-cell'}}, {text:'Phone', dataIndex:'phone', width:150}], listeners:{select:'onItemSelected'}});
Ext.define('Demo.dashboard.MainController', {extend:'Ext.app.ViewController', alias:'controller.dashboardmain', onItemSelected:function(sender, record) {
  Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
}, onConfirm:function(choice) {
  Demo.alerts.Manager.alert('Dashboard choice is "' + choice + '"');
}});
