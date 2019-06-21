<!--
 * @Author: 情雨随风
 * @Date: 2019-06-20 22:52:10
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-22 00:25:25
 * @Description: cion图标
 -->


<template>
    <span>
        <span v-if="code">
            <a-icon :type="type" style="margin-right: 8px" />
            {{ text }}
        </span>
        <span v-else>
            <a-tag color="blue">
                <a :href="github" target="_blank">GitHub</a>
            </a-tag>
            <a-tag color="blue">
                <a :href="viewUrl" target="_blank">View</a>
            </a-tag>
        </span>
    </span>
</template>

<script>
export default {
    name: 'IconText',
    props: {
        'type': {
            type: String
        },
        text: {
            type: [String, Number],
            required: true
        },
        code: {
            type: Boolean,
            default: () => true
        },
        viewUrl: {
            type: String,
            default: () => ""
        },
        github: {
            type: String,
            default: () => ""
        }
    }
}
</script>
