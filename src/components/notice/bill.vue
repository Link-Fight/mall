<template>
<notice :value="value" @input="$emit('input', false)">
    <div style="text-align:left;">
        <div style="padding:4px 0px;font-size: 10px;">1. 公司发票抬头请务必填写完整的公司全称，一经确认提交，<span style="color:red;">不能修改</span>。</div>
        <div style="padding:4px 0px;font-size: 10px;">2. 发票将于<span style="color:red;">20个工作日</span>内开具。</div>
        <div style="padding:4px 0px;font-size: 10px;">3. 如需更改收票地址，请联系极飞热线<span style="color:red;">4009803131</span>。</div>
        <div style="padding:4px 0px;font-size: 10px;">4. 应国家税务总局要求，自2017年7月1曰 起，您若开具增值税普通发票，<span style="color: red;">须同时提供企业抬头及税号，</span>否则发票将无法用于企业报销。</div>
    </div>
</notice>
</template>
<script>
import notice from '@/components/notice/notice'
export default {
    name: 'billNotice',
    components: { notice },
    props: {
        value: {
            type: Boolean,
            default: false
        }
    }
}
</script>