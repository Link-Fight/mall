<template>
    <div>
        <div class="xa-cell">
            <p class="xa-cell__hd xa-txt-14">{{config.name}}</p>&nbsp;
            <p class="xa-cell__bd xa-txt-14">{{config.phone}}</p>
        </div>
        <p class="xa-txt-12">{{config.area_name+config.area_address}}</p>
    </div>
</template>
<script>
export default {
    props: {
        config: {
            type: Object,
            default() {
                return {
                    guid: '123',
                    name: '柯琳',
                    phone: '15915797485',
                    area_address: '思成路1号北明软件2',
                    area_name: '广东省/广州市/增城市',
                    status: true
                }
            }
        }
    }
}
</script>
