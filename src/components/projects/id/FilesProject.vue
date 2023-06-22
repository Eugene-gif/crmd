<template>
  <q-dialog
    v-model="dialog"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog contractor-dialog-share"
  >
    <DialogUploadFiles 
      @modalFalse="modalFalse"
      @modalFalseUp="modalFalseUp"
      :updateActivated="updateActive"
      :updateObject="updateObj"
      :projectId="project_id"
    />
  </q-dialog>

  <q-dialog
    v-model="dialogDelite"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog"
  >
    <DialogDelite @modalFalse="handleModalClose" />
  </q-dialog>

  <q-expansion-item
    expand-separator
    default-opened
    class="files hidden-settings-icon"
  >
    <template v-slot:header>
      <div class="title">
        Приложенные файлы
      </div>
    </template>
    <q-card>
      <q-card-section>

        <q-list class="contractor-list">
          <q-item
            v-for="file in files"
            :key="file.id"
          >
            <q-item-section>
              <div class="subtitle">
                {{file.name}}
              </div>
              <div class="size" v-if="!file.size"><span class="lg-visible">Ссылка</span></div>
              <span class="mb-visible format" v-if="!file.size">Ссылка</span>

              <div class="size" v-if="file.size">
                <span class="lg-visible">{{file.mime}},</span> {{file.size}}
              </div>
              <span class="mb-visible format" v-if="file.size">
                {{file.format}}
              </span>

              <div class="btn-sec">
                <q-btn
                  unelevated 
                  no-caps
                  flat
                  class="my-btn my-effect h-opacity q-mr-md"
                  padding="0"
                  @click="updateFile(file)"
                  v-if="userRole === 'designer'"
                >
                  <q-icon name="svguse:icons/btnIcons.svg#edit" color="grey-8" size="16px" class="q-mr-sm" />
                  <span class="block text-grey-5">Редактировать</span>
                </q-btn>
                <q-btn
                  unelevated 
                  no-caps
                  flat
                  class="my-btn my-effect h-opacity"
                  padding="0"
                  @click="onActionDel('del', file.id)"
                  v-if="userRole === 'designer'"
                >
                  <q-icon name="svguse:icons/btnIcons.svg#delete" color="grey-8" size="16px" class="q-mr-sm" />
                  <span class="block text-grey-5">Удалить</span>
                </q-btn>
              </div>

              <q-icon name="svguse:icons/allIcons.svg#download" size="17px" @click="openLink(file.file)" />
            </q-item-section>
          </q-item>
        </q-list>

        <div class="add-btn">
          <q-btn
            unelevated
            no-caps
            class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite"
            @click="dialog = true"
            v-if="userRole === 'designer'"
          >
            <div class="block">Загрузить файл</div>
            <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" />
          </q-btn>
        </div>
        
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup>
  import ActionBtn from 'components/Table/ActionBtn.vue'
  import DialogUploadFiles from 'components/Profile/DialogUploadFiles'
  import DialogDelite from 'src/components/dialog/DialogDelite'
  import useDialogDel from 'src/composable/useDialogDel'
  import useFiles from 'src/composable/useFiles'

  const props = defineProps({
    data: Array,
    project_id: String,
    userRole: String
  })

  // инициализация управления файлами
  const {
    dialog,
    files,
    updateActive,
    updateObj,
    modalFalse,
    modalFalseUp,
    delFile,
    updateFile,
    openLink
  } = useFiles(props.data)

  // удаление файла
  const actionHandlers = {
    del: delFile,
  }

  // инициализация удаления файла
  const { 
    dialogDelite, 
    dialogDelId, 
    dialogDelName, 
    onActionDel, 
    modalCloseDel, 
    handleModalClose 
  } = useDialogDel(actionHandlers)

</script>