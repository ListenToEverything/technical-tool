<template>
	<div id="pcContract">
		<div @click="download()">合同</div>
	</div>
</template>
<script>
import saveAs from 'file-saver'
import '@/utils/jquery.wordexport'
export default {
	data() {
		return {}
	},
	created() {},
	methods: {
		download() {
      document.getElementById('#pcContract').wordExport('文档')
		},
	},
}
</script>
<style lang="scss" scoped></style>