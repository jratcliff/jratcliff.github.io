Ext.define('Demo.settings.Main', {extend:'Ext.grid.Panel', xtype:'settingsmain', controller:'settingsmain', title:'Settings', store:{type:'users'}, columns:[{text:'Name', dataIndex:'name', flex:1}, {text:'Email', dataIndex:'email', flex:1, cell:{userCls:'demo-settings-cell'}}, {text:'Phone', dataIndex:'phone', width:150}], listeners:{select:'onItemSelected'}});
Ext.define('Demo.settings.MainController', {extend:'Ext.app.ViewController', alias:'controller.settingsmain', onItemSelected:function(sender, record) {
  Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
}, onConfirm:function(choice) {
  Demo.alerts.Manager.alert('Settings choice is "' + choice + '"');
}});
