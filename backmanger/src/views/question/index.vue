<template>
    <div>
        <el-button type="primary" @click="toCreate">新建试题</el-button>
        <div>
            <el-card class="question-card" v-for="(item, index) in data">
                <el-descriptions :column="5" :title="item.subjectCode">
                    <el-descriptions-item label="试卷名称：">{{ item.questionSetName }}</el-descriptions-item>
                    <el-descriptions-item label="创建人：">{{ item.username }}</el-descriptions-item>
                    <el-descriptions-item label="版本：">{{ item.version }}</el-descriptions-item>
                    <el-descriptions-item label="序号：">{{ index + 1 }}</el-descriptions-item>
                    <el-descriptions-item label="试卷编号：">{{ item.testSetNumber }}</el-descriptions-item>
                    <el-descriptions-item label="课程代码：">{{ getCourseLabel(item.courseCode) }}</el-descriptions-item>
                    <el-descriptions-item label="题目：">{{ item.type }}</el-descriptions-item>
                    <el-descriptions-item label="难度等级：">{{ item.difficultyLevel }}</el-descriptions-item>
                    <el-descriptions-item label="分值：">{{ item.score }}</el-descriptions-item>
                    <el-descriptions-item label="最快速度：">{{ item.originalScore }}</el-descriptions-item>
                    <el-descriptions-item label="最慢速度：">{{ item.originalScore }}</el-descriptions-item>
                    <el-descriptions-item label="阅读时间：">{{ item.originalScore }}</el-descriptions-item>
                </el-descriptions>
                <el-descriptions :column="1">
                    <el-descriptions-item label="知识点：">{{ item.knowledgeId }}</el-descriptions-item>
                    <el-descriptions-item :label="findSubject(item.type) + '：'">
                        <h2 v-html="item.content"></h2>
                    </el-descriptions-item>
                </el-descriptions>
                <el-card shadow="never" v-for="subItem in item.data">
                    <div v-html="subItem.title || subItem.content"> </div>
                    <div v-if="item.type == 1 || item.type == 2">
                        <div>
                            <div>
                                <div class="primary">【选项A】：</div>
                                <div v-html="subItem.A"></div>
                            </div>
                            <div>
                                <div class="primary">【选项B】：</div>
                                <div v-html="subItem.B"></div>
                            </div>
                            <div>
                                <div class="primary">【选项C】：</div>
                                <div v-html="subItem.C"></div>
                            </div>
                            <div>
                                <div class="primary">【选项D】：</div>
                                <div v-html="subItem.D"></div>
                            </div>
                        </div>
                        <div>
                            <span class="primary">【正确答案】：</span> <span>{{ handleAnwer(subItem.answer) }}</span>
                        </div>
                        <div>
                            <div>
                                <div class="primary">【解析A】：</div>
                                <div v-html="subItem.analysisA"></div>
                            </div>
                            <div>
                                <div class="primary">【解析B】：</div>
                                <div v-html="subItem.analysisB"></div>
                            </div>
                            <div>
                                <div class="primary">【解析C】：</div>
                                <div v-html="subItem.analysisC"></div>
                            </div>
                            <div>
                                <div class="primary">【解析D】：</div>
                                <div v-html="subItem.analysisD"></div>
                            </div>
                        </div>
                    </div>
                    <div v-if="item.type == 3">
                        <div>
                            <span class="primary">【正确答案】：</span> <span>{{ handleAnwer(subItem.answer) }}</span>
                        </div>
                        <div>
                            <div class="primary">【解析】：</div>
                            <div v-html="subItem.analysis"></div>
                        </div>
                    </div>
                    <div v-if="item.type == 4">
                        <div class="primary">【正确答案】</div>
                        <div v-html="subItem.answer"></div>
                    </div>
                    <div v-if="item.type == 5">
                        <div class="primary">【正确答案】</div>
                        <div v-html="subItem.answer"></div>
                        <el-table border :data="subItem.terms">
                            <el-table-column label="关键词" prop="keyword"></el-table-column>
                            <el-table-column label="同义词" prop="synonym"></el-table-column>
                            <el-table-column label="反义词" prop="antonym"></el-table-column>
                            <el-table-column label="得分" prop="score"></el-table-column>
                        </el-table>
                    </div>
                    <div v-if="item.type == 6">
                        <div class="primary">【正确答案】</div>
                        <div v-html="subItem.answer"></div>
                        <div class="primary">【问题描述】</div>
                        <div v-html="subItem.question"></div>
                        <el-table border :data="subItem.terms">
                            <el-table-column label="关键词" prop="keyword"></el-table-column>
                            <el-table-column label="同义词" prop="synonym"></el-table-column>
                            <el-table-column label="反义词" prop="antonym"></el-table-column>
                            <el-table-column label="得分" prop="score"></el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-card>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useSubjectList } from './hooks';
import { useRouter } from 'vue-router'

const { data, getCourseLabel, findSubject, handleAnwer } = useSubjectList()
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