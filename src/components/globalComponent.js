import Vue from 'vue'
import {
    Button, Select, Message, Card, Input, Form, FormItem, Table, DatePicker, TableColumn,
    Row, Col, Dialog, Upload, Tooltip, MessageBox, Tabs, TabPane
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.component(Button.name, Button) 
Vue.component(Select.name, Select) 
Vue.component(Message.name, Select) 
Vue.component(Card.name, Card)  
Vue.component(Input.name, Input)  
Vue.component(Form.name, Form)  
Vue.component(FormItem.name, FormItem)  
Vue.component(Table.name, Table) 
Vue.component(DatePicker.name, DatePicker)  
Vue.component(TableColumn.name, TableColumn) 
Vue.component(Row.name, Row) 
Vue.component(Col.name, Col) 
Vue.component(Dialog.name, Dialog) 
Vue.component(Upload.name, Upload) 
Vue.component(Tooltip.name, Tooltip) 
Vue.component(MessageBox.name, MessageBox) 
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
