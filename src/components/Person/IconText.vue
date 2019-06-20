<!--
 * @Author: 情雨随风
 * @Date: 2019-06-20 22:52:10
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-20 22:52:46
 * @Description: cion图标
 -->


<template>
    <span>
        <a-icon :type="type" style="margin-right: 8px" />
        {{ text }}
    </span>
</template>

<script>
export default {
    name: 'IconText',
    props: {
        'type': {
            type: String,
            required: true
        },
        text: {
            type: [String, Number],
            required: true
        }
    }
}
</script>
