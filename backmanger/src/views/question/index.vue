<template>
    <div>
        <el-button type="primary" @click="toCreate">新建试题</el-button>
        <div>
            <el-card class="question-card" v-for="(item, index) in data">
                <el-descriptions :column="5" :title="item.subjectCode">
                    <el-descriptions-item label="创建人：">{{ item.username }}</el-descriptions-item>
                    <el-descriptions-item label="版本：">{{ item.version }}</el-descriptions-item>
                    <el-descriptions-item label="序号：">{{ index + 1 }}</el-descriptions-item>
                    <el-descriptions-item label="课程代码：">{{ getCourseLabel(item.courseCode) }}</el-descriptions-item>
                    <el-descriptions-item label="题目：">{{ item.type }}</el-descriptions-item>
                    <el-descriptions-item label="难度等级：">{{ item.degree }}</el-descriptions-item>
                    <el-descriptions-item label="分值：">{{ item.score }}</el-descriptions-item>
                    <el-descriptions-item label="最快速度：">{{ item.originalScore }}</el-descriptions-item>
                    <el-descriptions-item label="最慢速度：">{{ item.originalScore }}</el-descriptions-item>
                    <el-descriptions-item label="阅读时间：">{{ item.originalScore }}</el-descriptions-item>
                </el-descriptions>
                <el-descriptions :column="1">
                    <el-descriptions-item label="知识点：">
                        <div>{{ item.knowledgeId }}</div>
                    </el-descriptions-item>
                    <el-descriptions-item label="选文地址：">
                        <div v-html="item.selectedArticleAddress"></div>
                    </el-descriptions-item>
                    <el-descriptions-item label="图片地址：">
                        <div v-html="item.pictureAddress"></div>
                    </el-descriptions-item>
                    <el-descriptions-item label="音频地址：">
                        <div v-html="item.audioAddress"></div>
                    </el-descriptions-item>
                    <el-descriptions-item label="视频地址：">
                        <div v-html="item.videoAddress"></div>
                    </el-descriptions-item>
                    <el-descriptions-item label="选项：">
                        <div>
                            {{ item.options }}
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item label="解析：">
                        <div>
                            {{ item.analysis }}
                        </div>
                    </el-descriptions-item>
                </el-descriptions>
            </el-card>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useSubjectList } from './hooks';
import { useRouter } from 'vue-router'
const { data, getCourseLabel } = useSubjectList()
defineOptions({ name: 'Question' })
const router = useRouter()
const toCreate = () => {
    router.push('/page/question/create')
}

</script>

<style scoped lang="less">
.question-card {
    margin-bottom: 10px;

    &:first-child {
        margin-top: 10px;
    }
}
</style>