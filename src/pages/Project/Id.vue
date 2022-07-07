<template>
  <q-dialog
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog projects-dialog projects-dialog-create"
  >
    <Dialog @modalFalse="modalFalse" />
  </q-dialog>
  
  <q-page class="page-project">
    <div class="row justify-between items-center head">
      <div class="text-h2">Название проекта</div>
      <q-icon size="18px" class="mb-visible" name="svguse:icons/allIcons.svg#back" />
      <div class="head-btns">
        <q-btn
          rounded
          unelevated
          no-caps
          class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite lg-visible"
          label="Назад"
        />
      </div>
    </div>
    <div class="row items-center header-btns">
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-positive text-white q-mr-xs my-btn my-effect h-dark"
        label="Выставить счет"
      />
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-positive text-white my-btn my-effect h-dark q-mr-xs"
        label="Указать поступление средств"
      />
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-positive text-white my-btn my-effect h-dark q-mr-xs"
        label="План-график"
      />
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-positive text-white my-btn my-effect h-dark q-mr-xs"
        label="Сметы"
      />
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-positive text-white my-btn my-effect h-dark q-mr-xs"
        label="Финансы"
      />
    </div>
    <div class="row items-center header-btns-2">
      <q-btn
        rounded
        no-caps
        outline
        color="grey-3"
        class="q-mr-xs my-btn my-effect my-btn--outline q-btn-info"
        @click="dialog = true"
      >
        <q-icon name="svguse:icons/btnIcons.svg#user" color="grey-8" size="16px" class="q-mr-md">
          <sup>
            3
          </sup>
        </q-icon>
        <q-icon name="svguse:icons/btnIcons.svg#link" color="grey-8" size="18px" class="q-mr-md link-icon">
          <div class="circle"></div>
        </q-icon>
        <div class="block text-grey-5">Настройки доступа</div>
      </q-btn>
      <q-btn
        rounded
        no-caps
        outline
        color="grey-3"
        class="my-btn my-effect q-mr-xs my-btn--outline"
      >
        <q-icon name="svguse:icons/btnIcons.svg#edit" color="grey-8" size="17px" class="q-mr-md" />
        <div class="block text-grey-5">Редактировать</div>
      </q-btn>
      <q-btn
        rounded
        no-caps
        outline
        color="grey-3"
        class="my-btn my-effect q-mr-xs my-btn--outline"
      >
        <q-icon name="svguse:icons/btnIcons.svg#delete" color="grey-8" size="17px" class="q-mr-md" />
        <div class="block text-grey-5">Удалить проект</div>
      </q-btn>
    </div>

    <q-list class="project-sections">
      <q-expansion-item
        expand-separator
        default-opened
        label="Wifi settings"
        class="dashboard"
      >
      <template v-slot:header>
        <div class="title">
          Дашборд
        </div>
        <q-icon name="svguse:icons/allIcons.svg#settings" size="17px" class="settings-icon" @click.stop="true" />
      </template>
      
        <q-card>
          <q-card-section>
            <div class="section">
              <q-item class="square">
                <div class="title">Площадь</div>
                <div class="number">115 м<sup>2</sup></div>
              </q-item>
              <q-item class="info">
                <p class="adres">
                  Адрес: г. Краснодар,
                  ул. Ленина, д. 15
                </p>
                <p class="type">
                  Тип: Квартира<br>
                  Заказчик: Иванов Петр
                </p>
              </q-item>
            </div>
            <div class="img-section mb-visible">
              <img src="~assets/project-1-mb.jpg" alt="">
            </div>
            
            <div class="q-item section-toolbar">
              <div class="item">
                <div class="title">Прогресс проекта <span>40%</span></div>
                <div class="flex toolbar">
                  <div class="toolbar-procent bg-primary" style="width: 40%"></div>
                </div>
              </div>
              <div class="item">
                <div class="title">Оплата <span>20%</span></div>
                <div class="flex toolbar">
                  <div class="toolbar-procent bg-positive" style="width: 30%"></div>
                </div>
              </div>
            </div> 
          </q-card-section>
          <q-card-section class="img-section">
            <img src="~assets/project-1.jpg" alt="">
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        default-opened
        class="graffic"
      >
      <template v-slot:header>
        <div class="title">
          План-график проекта
        </div>
        <q-icon name="svguse:icons/allIcons.svg#settings" size="17px" class="settings-icon" @click.stop="true" />
      </template>
        <q-card class="q-card-graffic-option">
          <q-card-section>
            <q-item>
              <div class="title">Услуга</div>
            </q-item>
            <q-item>
              <div class="title">Длится, дн</div>
            </q-item>
            <q-item>
              <div class="title">Дата начала</div>
            </q-item>
          </q-card-section>
          
          <q-card-section 
            v-for="item in grafficOptopn"
            :key="item"
            class="q-card-content"
          >
            <q-item>
              <q-input v-model="item.services" class="my-input bg-grey-3" placeholder="Введите название">
                <template v-slot:append>
                  <q-icon name="svguse:icons/btnIcons.svg#delete" size="16px" />
                </template>
              </q-input>
            </q-item>
            <q-item>
              <q-input v-model="item.days" class="my-input bg-grey-3" />
            </q-item>
            <q-item>
              <BtnDate
                :addClass="'q-date-full'"
                :info="item.date"
              />
            </q-item>
          </q-card-section>
          <q-card-section 
            class="q-card-add"
          >
            <q-item>
              <q-btn
                unelevated
                no-caps
                outline
                class="bg-white text-grey-3 my-btn my-effect my-btn--outline"
                style="border-radius: 10px;"
                padding="24px 24px 24px 19px"
              >
                <div class="block text-grey-5">Добавить</div>
                <q-icon
                  name="svguse:icons/allIcons.svg#plus"
                  size="12px"
                  color="black"
                  style="opacity: 0.3;margin-left: auto;"
                />
              </q-btn>
            </q-item>
          </q-card-section>
        </q-card>
        <q-card class="q-card-graffic">
          <q-card-section class="info">
            <div class="head">
              <p>
                Сегодня 20 февраля 2021<br>
                День 30 из 95
              </p>
              <div class="line"></div>
            </div>
            <div class="content">
              <div
                class="item"
                v-for="item in grafficOptopn"
                :key="item"
              >
                {{item.services}} ({{item.days}} дн)
              </div>
            </div>
          </q-card-section>
          <q-card-section class="canvas">
            <grafic/>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        default-opened
        class="documents"
      >
      <template v-slot:header>
        <div class="title">
          Документы
        </div>
        <q-icon name="svguse:icons/allIcons.svg#settings" size="17px" class="settings-icon" @click.stop="true" />
      </template>
        <q-card>
          <q-card-section>
            <div class="sorted">
              <div class="sorted-section mb-visible">
                <div class="title">Сортировка: </div>
                <q-select
                  borderless
                  v-model="model"
                  :options="columns"
                  behavior="menu"
                  popup-content-class="select-menu-mobile"
                />
              </div>
              <div class="sorted-btns mb-visible">
                <q-icon size="7px" name="svguse:icons/allIcons.svg#tableArrowDown" />
                <q-icon size="7px" name="svguse:icons/allIcons.svg#tableArrowUp" />
              </div>
            </div>
            <q-table
              flat
              :rows="rows"
              :columns="columns"
              row-key="id"
              hide-pagination
              class="my-table project-table"
            >
              <template v-slot:header-cell-id="props">
                <q-th :props="props" class="q-th__id">
                </q-th>
              </template>
              <template v-slot:header-cell-action="props">
                <q-th :props="props" class="q-th__action">
                </q-th>
              </template>
              <template v-slot:header-cell="props">
                <q-th :props="props">
                  <span class="q-th__title">
                    {{ props.col.label }}
                  </span>
                  <i
                    class="notranslate material-icons q-icon q-table__sort-icon q-table__sort-icon--left"
                    aria-hidden="true"
                    role="presentation"
                  >
                    <q-icon size="7px" color="grey-5" name="svguse:icons/financeTable.svg#tableArrrow" />
                  </i>
                </q-th>
              </template>

              <template #body="props">
                <q-tr
                  :props="props"
                >
                  <q-td
                    key="name"
                    :props="props"
                    class="q-td-name"
                  >
                    <div class="content">{{props.row.name}}</div>
                  </q-td>
                  <q-td
                    key="sum"
                    :props="props"
                    class="q-td-sum"
                  >
                    <div class="content">{{props.row.sum}} руб.</div>
                  </q-td>
                  <q-td
                    key="changed"
                    :props="props"
                    class="q-td-changed"
                  >
                    <div class="content">{{props.row.changed}}</div>
                  </q-td>
                  <q-td
                    key="created"
                    :props="props"
                    class="q-td-created"
                  >
                    <div class="content">{{props.row.created}}</div>
                  </q-td>
                  <q-td
                    key="status"
                    :props="props"
                    class="q-td-status"
                  >
                    <div class="row items-center">
                      <div class="circle" :class="{active: props.row.status > 1}"></div>
                      <div class="content">{{props.row.statusName}}</div>
                      <ActionBtn 
                        :propsEl="props.key"
                        :offsetYX="[55, -258]"
                      />
                    </div>
                  </q-td>
                </q-tr>
              </template>
              <template #bottom>
                <q-tr
                  :props="props"
                >
                  <q-btn
                    unelevated
                    no-caps
                    class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite"
                  >
                    <div class="block">Создать новый документ</div>
                    <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" />
                  </q-btn>
                </q-tr>
              </template>
            </q-table>

          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        default-opened
        class="data"
      >
      <template v-slot:header>
        <div class="title">
          Данные объекта
        </div>
        <q-icon name="svguse:icons/allIcons.svg#settings" size="17px" class="settings-icon" @click.stop="true" />
      </template>
        <q-card>
          <q-card-section class="q-card-head">
            <q-item>
              <div class="title">Адрес</div>
              <q-input v-model="text" class="my-input bg-grey-3" />
            </q-item>
            <q-item>
              <div class="title">Площадь, м2</div>
              <q-input v-model="text2" class="my-input bg-grey-3" />
            </q-item>
            <q-item>
              <div class="title">Тип</div>
              <q-select
                filled
                v-model="select1"
                :options="type"
                stack-label
                placeholder="Выбрать"
                dropdown-icon="svguse:icons/allIcons.svg#select-arrow"
                class="my-select"
                behavior="menu"
                ref="selectDropbox"
                popup-content-class="my-select-menu"
              />
            </q-item>
          </q-card-section>
          <q-card-section class="q-card-titles">
            <q-item>
              <div class="title">Помещения</div>
            </q-item>
            <q-item>
              <div class="title">Площадь, м2</div>
            </q-item>
          </q-card-section>
          <q-card-section 
            v-for="premis in premises"
            :key="premis"
            class="q-card-content q-card-room"
          >
            <q-item>
              <q-input v-model="premis.input" class="my-input bg-grey-3" placeholder="Введите название">
                <template v-slot:append>
                  <q-icon name="svguse:icons/btnIcons.svg#delete" size="16px" />
                </template>
              </q-input>
            </q-item>
            <q-item>
              <q-input v-model="premis.s" class="my-input bg-grey-3" />
            </q-item>
          </q-card-section>
          <q-card-section 
            class="q-card-add"
          >
            <q-item>
              <q-btn
                unelevated
                no-caps
                outline
                class="bg-white text-grey-3 my-btn my-effect my-btn--outline"
                style="border-radius: 10px;"
                padding="24px 24px 24px 19px"
              >
                <div class="block text-grey-5">Добавить</div>
                <q-icon
                  name="svguse:icons/allIcons.svg#plus"
                  size="12px"
                  color="black"
                  style="opacity: 0.3;margin-left: auto;"
                />
              </q-btn>
            </q-item>
          </q-card-section>
          <q-card-section 
            class="q-card-all"
          >
            <q-item>
              <div class="title">Общий гонорар</div>
              <q-input v-model="text4" class="my-input bg-grey-3" placeholder="Укажите общий гонорар">
                <template v-slot:append>
                  <div class="block">руб.</div>
                </template>
              </q-input>
            </q-item>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        default-opened
        class="estimates"
      >
      <template v-slot:header>
        <div class="title">
          Сметы
        </div>
        <q-icon name="svguse:icons/allIcons.svg#settings" size="17px" class="settings-icon" @click.stop="true" />
      </template>
        <q-card>
          <q-card-section>
            <div class="title">
              Общая смета проекта
            </div>
            <div class="text">
              Сумма всех<br>
              отдельных смет
            </div>
          </q-card-section>
          <q-card-section
            v-for="item in estimates" :key="item.id"
          >
            <q-item to="#dsf" class="link-all"></q-item>
            <div class="title">{{item.name}}</div>
            <div class="text">
              Изменена: {{item.changed}} <br>
              Создана: {{item.created}}
            </div>
            <div class="access q-pr-xs">
              <div class="text">
                Общий доступ
              </div>
              <q-icon name="svguse:icons/btnIcons.svg#link" size="18px" class="q-mr-sm link-icon">
                <q-item class="link-all" to="#eee"></q-item>
                <div class="circle"></div>
              </q-icon>
            </div>
            <q-list class="q-list-share">
              <q-item
                v-for="el in item.share.slice(0, 1)" :key="el.link"
              >
                <q-btn :to="el.link">
                  <img :src="el.icon" alt="">
                </q-btn>
              </q-item>
              <q-item
                v-if="item.share.length > 1"
              >
                <q-btn class="q-td-share__btn__limit" :label="`+${item.share.length - 1}`" />
              </q-item>
              <q-item class="q-item-add">
                <q-btn class="q-td-share__btn__add" icon="svguse:icons/allIcons.svg#plus" />
              </q-item>
              <q-item class="q-item-action">
                <ActionBtn 
                  :propsEl="item.id"
                  :offsetYX="[55, -266]"
                />
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-section class="q-card-add">
            <q-btn
              rounded
              unelevated
              no-caps
              icon="svguse:icons/btnIcons.svg#plus"
              class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite lg-visible"
            />
            <div class="text lg-visible">
              Добавить<br>
              смету
            </div>
            <q-btn
                unelevated
                no-caps
                outline
                class="bg-white text-grey-3 my-btn my-effect my-btn--outline mb-visible"
                style="border-radius: 10px;"
                padding="24px 24px 24px 19px"
              >
                <div class="block text-grey-5">Добавить</div>
                <q-icon
                  name="svguse:icons/allIcons.svg#plus"
                  size="12px"
                  color="black"
                  style="opacity: 0.3;margin-left: auto;"
                />
            </q-btn>
          </q-card-section>
          
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        default-opened
        class="visual"
      >
      <template v-slot:header>
        <div class="title">
          Визуал
        </div>
        <q-icon name="svguse:icons/allIcons.svg#settings" size="17px" class="settings-icon" @click.stop="true" />
      </template>
        <q-card>
          <q-card-section
            v-for="item in visual"
            :key="item.id"
          >
            <VisualSlider
              :images="item.images"
            />
            <div class="row desc">
              <div class="title">{{item.name}}</div>
              <ActionBtn 
                :propsEl="item.id"
                :offsetYX="[55, -266]"
              />
            </div>
            <div class="row security">
              <q-btn
                unelevated
                no-caps
                class="bg-grey-3 text-grey-5 my-btn my-effect"
                padding="9px 14px"
              >
                Доступ по ссылке
                <q-icon name="svguse:icons/btnIcons.svg#link" size="18px" class="q-mr-sm link-icon">
                  <div class="circle"></div>
                </q-icon>
              </q-btn>
              <q-list class="q-list-share">
                <q-item
                  v-for="el in item.share.slice(0, 4)" :key="el.link"
                >
                  <q-btn :to="el.link">
                    <img :src="el.icon" alt="">
                  </q-btn>
                </q-item>
                <q-item
                  v-if="item.share.length > 1"
                >
                  <q-btn class="q-td-share__btn__limit" :label="`+${item.share.length - 1}`" />
                </q-item>
                <q-item class="q-item-add">
                  <q-btn class="q-td-share__btn__add" icon="svguse:icons/allIcons.svg#plus" />
                </q-item>
              </q-list>
            </div>
            <!-- action -->
          </q-card-section>
          <q-card-section class="q-card-btn">
            <q-btn
              unelevated
              no-caps
              class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite " 
            >
              <div class="block">Добавить альбом</div>
              <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" />
            </q-btn>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        default-opened
        class="visual visual-2"
      >
      <template v-slot:header>
        <div class="title">
          Визуал
        </div>
        <q-icon name="svguse:icons/allIcons.svg#settings" size="17px" class="settings-icon" @click.stop="true" />
      </template>
        <q-card>
          <q-card-section
            v-for="item in visual"
            :key="item.id"
          >
            <VisualSlider
              :images="item.images"
            />
            <div class="row desc">
              <div class="title">{{item.name}}</div>
              <ActionBtn 
                :propsEl="item.id"
                :offsetYX="[55, -266]"
              />
            </div>
            <div class="row security">
              <q-btn
                unelevated
                no-caps
                class="bg-white text-grey-5 my-btn my-effect"
                padding="9px 14px"
              >
                Доступ по ссылке
                <q-icon name="svguse:icons/btnIcons.svg#link" size="18px" class="q-mr-sm link-icon">
                  <div class="circle"></div>
                </q-icon>
              </q-btn>
              <br>
              <q-list class="q-list-share">
                <q-item
                  v-for="el in item.share.slice(0, 2)" :key="el.link"
                >
                  <q-btn :to="el.link">
                    <img :src="el.icon" alt="">
                  </q-btn>
                </q-item>
                <q-item
                  v-if="item.share.length > 2"
                >
                  <q-btn class="q-td-share__btn__limit" :label="`+${item.share.length - 2}`" />
                </q-item>
                <q-item class="q-item-add">
                  <q-btn class="q-td-share__btn__add" icon="svguse:icons/allIcons.svg#plus" />
                </q-item>
              </q-list>
            </div>
            <!-- action -->
          </q-card-section>
          <q-card-section class="q-card-add">
            <q-btn
              rounded
              unelevated
              no-caps
              icon="svguse:icons/btnIcons.svg#plus"
              class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite"
            />
            <div class="text">
              Добавить<br>
              альбом
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        default-opened
        class="files"
      >
      <template v-slot:header>
        <div class="title">
          Приложенные файлы
        </div>
        <q-icon name="svguse:icons/allIcons.svg#settings" size="17px" class="settings-icon" @click.stop="true" />
      </template>
        <q-card>
          <q-card-section>
            <div class="sorted">
              <div class="sorted-section mb-visible">
                <div class="title">Сортировка: </div>
                <q-select
                  borderless
                  v-model="model"
                  :options="columns"
                  behavior="menu"
                  popup-content-class="select-menu-mobile"
                />
              </div>
              <div class="sorted-btns mb-visible">
                <q-icon size="7px" name="svguse:icons/allIcons.svg#tableArrowDown" />
                <q-icon size="7px" name="svguse:icons/allIcons.svg#tableArrowUp" />
              </div>
            </div>
            <q-table
              flat
              :rows="rows2"
              :columns="columns2"
              row-key="id"
              hide-pagination
              class="my-table project-table"
            >
              <template v-slot:header-cell-id="props">
                <q-th :props="props" class="q-th__id">
                </q-th>
              </template>
              <template v-slot:header-cell-action="props">
                <q-th :props="props" class="q-th__action">
                </q-th>
              </template>
              <template v-slot:header-cell="props">
                <q-th :props="props">
                  <span class="q-th__title">
                    {{ props.col.label }}
                  </span>
                  <i
                    class="notranslate material-icons q-icon q-table__sort-icon q-table__sort-icon--left"
                    aria-hidden="true"
                    role="presentation"
                  >
                    <q-icon size="7px" color="grey-5" name="svguse:icons/financeTable.svg#tableArrrow" />
                  </i>
                </q-th>
              </template>

              <template #body="props">
                <q-tr
                  :props="props"
                >
                  <q-td
                    key="name"
                    :props="props"
                    class="q-td-name"
                  >
                    <div class="row items-center">
                      <q-icon size="17px" name="svguse:icons/allIcons.svg#download" class="q-mr-md" />
                      <div class="content">{{props.row.name}}</div>
                    </div>
                    
                  </q-td>
                  <q-td
                    key="created"
                    :props="props"
                    class="q-td-created"
                  >
                    <div class="content">{{props.row.created}}</div>
                  </q-td>
                  <q-td
                    key="changed"
                    :props="props"
                    class="q-td-changed"
                  >
                    <div class="content">{{props.row.changed}}</div>
                  </q-td>
                  <q-td
                    key="type"
                    :props="props"
                    class="q-td-type"
                  >
                    <div class="content">{{props.row.type}}</div>
                  </q-td>
                  <q-td
                    key="size"
                    :props="props"
                    class="q-td-status"
                  >
                    <div class="row items-center">
                      <div class="content">{{props.row.size}}</div>
                      <ActionBtn 
                        :propsEl="props.key"
                        :offsetYX="[55, -258]"
                      />
                    </div>
                  </q-td>
                </q-tr>
              </template>
              <template #bottom>
                <q-tr
                  :props="props"
                >
                  <q-btn
                    unelevated
                    no-caps
                    class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite"
                  >
                    <div class="block">Загрузить файл</div>
                    <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" />
                  </q-btn>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <div class="q-card-prev">
        <q-btn
            unelevated
            no-caps
            outline
            class="bg-white text-grey-3 my-btn my-effect с"
            style="border-radius: 10px;width: 100%;"
            padding="24px 24px 24px 19px"
          >
            <div class="block text-grey-5">Назад к списку проектов</div>
            <q-icon size="18px" name="svguse:icons/allIcons.svg#back" style="margin-left: auto;" />
          </q-btn>
      </div>

    </q-list>
  </q-page>
</template>

<script>
import Dialog from 'pages/Project/dialog-create.vue'
import ActionBtn from 'components/Table/ActionBtn.vue'
import VisualSlider from 'components/projects/VisualSlider.vue'
import grafic from 'components/GraficGant.vue'
import BtnDate from 'components/BtnDate.vue'

import { ref } from 'vue'

const columns = ref([
  { name: 'id', label: '', field: 'id', align: 'left' },
  { name: 'name', label: 'Название', field: 'name', align: 'left', sortable: true },
  { name: 'sum', label: 'Сумма', field: 'sum', align: 'left', sortable: true },
  { name: 'changed', label: 'Изменен', field: 'changed', align: 'left', sortable: true },
  { name: 'created', label: 'Создан', field: 'created', align: 'left', sortable: true },
  { name: 'status', label: 'Статус', field: 'status', align: 'left', sortable: true }
])
const columns2 = ref([
  { name: 'id', label: '', field: 'id', align: 'left' },
  { name: 'name', label: 'Название', field: 'name', align: 'left', sortable: true },
  { name: 'created', label: 'Создан', field: 'created', align: 'left', sortable: true },
  { name: 'changed', label: 'Изменен', field: 'changed', align: 'left', sortable: true },
  { name: 'type', label: 'Тип', field: 'type', align: 'left', sortable: true },
  { name: 'size', label: 'Размер', field: 'size', align: 'left', sortable: true }
])

const rows = ref([
  {
    id: 1,
    name: 'Договор №150',
    sum: '900 000',
    changed: '10:35',
    created: 'Вчера',
    status: 1,
    statusName: 'Подписан'
  },
  {
    id: 2,
    name: 'Счет №25',
    sum: '80 000',
    changed: '10:35',
    created: 'Позавчера',
    status: 2,
    statusName: 'Не оплачен'
  },
  {
    id: 3,
    name: 'Счет №25',
    sum: '80 000',
    changed: '10:35',
    created: 'Позавчера',
    status: 3,
    statusName: 'Отправка'
  },
])
const rows2 = ref([
  {
    id: 1,
    name: 'Архив с 3д-моделями столов',
    created: 'Позавчера',
    changed: '14:23',
    type: 'ZIP',
    size: '1 мб',
  },
  {
    id: 2,
    name: 'Архив с 3д-моделями стульев',
    created: '25 / 05 / 2021',
    changed: '25 / 05 / 2021',
    type: 'Ссылка',
    size: '',
  },
])

export default {
  name: 'PageFinance',
  components: {
    Dialog,
    ActionBtn,
    VisualSlider,
    grafic,
    BtnDate
  },
  setup () {
    const dialog = ref(false)
    const estimates = ref([
      {
        id: 1,
        name: 'Напольные покрытия',
        changed: '10:35',
        created: '24/05/2021',
        share: [
          {
            icon: '/icons/anton.jpg',
            link: 's'
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          }
        ]
      },
      {
        id: 2,
        name: 'Напольные покрытия',
        changed: '10:35',
        created: '24/05/2021',
        share: [
          {
            icon: '/icons/anton.jpg',
            link: 's'
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          }
        ]
      },
      {
        id: 3,
        name: 'Напольные покрытия',
        changed: '10:35',
        created: '24/05/2021',
        share: [
          {
            icon: '/icons/anton.jpg',
            link: 's'
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          }
        ]
      },
      {
        id: 4,
        name: 'Напольные покрытия',
        changed: '10:35',
        created: '24/05/2021',
        share: [
          {
            icon: '/icons/anton.jpg',
            link: 's'
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          }
        ]
      },
      {
        id: 5,
        name: 'Напольные покрытия',
        changed: '10:35',
        created: '24/05/2021',
        share: [
          {
            icon: '/icons/anton.jpg',
            link: 's'
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          }
        ]
      },
      {
        id: 6,
        name: 'Напольные покрытия',
        changed: '10:35',
        created: '24/05/2021',
        share: [
          {
            icon: '/icons/anton.jpg',
            link: 's'
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          }
        ]
      },
      {
        id: 7,
        name: 'Напольные покрытия',
        changed: '10:35',
        created: '24/05/2021',
        share: [
          {
            icon: '/icons/anton.jpg',
            link: 's'
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          }
        ]
      },
      {
        id: 8,
        name: 'Напольные покрытия',
        changed: '10:35',
        created: '24/05/2021',
        share: [
          {
            icon: '/icons/anton.jpg',
            link: 's'
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          }
        ]
      },
      
    ])
    const visual = ref([
      {
        id: 1,
        images: [
          '/project-1.jpg',
          '/project-2.jpg',
          '/project-3.jpg',
        ],
        name: 'Планы, чертежи, схемы',
        share: [
          {
            icon: '/icons/anton.jpg',
            link: 's'
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          }
        ]
      },
      {
        id: 2,
        images: [
          '/project-1.jpg',
          '/project-2.jpg',
          '/project-3.jpg',
        ],
        name: 'Планы, чертежи, схемы',
        share: [
          {
            icon: '/icons/anton.jpg',
            link: 's'
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          }
        ]
      },
      {
        id: 3,
        images: [
          '/project-1.jpg',
          '/project-2.jpg',
          '/project-3.jpg',
        ],
        name: 'Планы, чертежи, схемы',
        share: [
          {
            icon: '/icons/anton.jpg',
            link: 's'
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          }
        ]
      },
      {
        id: 4,
        images: [
          '/project-1.jpg',
          '/project-2.jpg',
          '/project-3.jpg',
        ],
        name: 'Планы, чертежи, схемы',
        share: [
          {
            icon: '/icons/anton.jpg',
            link: 's'
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          }
        ]
      },
    ])
    const grafficOptopn = ref([
      {
        services: 'Планировочное решение',
        days: 20,
        date: '1-6-2022'
      },
      {
        services: 'Дизайн-концепция',
        days: 15,
        date: '5-5-2022'
      },
      {
        services: 'Визуальная подача',
        days: 5,
        date: '5-6-2022'
      },
      {
        services: 'Рабочая документация',
        days: 7,
        date: '10-6-2022'
      },
    ])
    return {
      columns,
      rows,
      columns2,
      rows2,
      dialog,
      select1: ref(
        {
          label: 'Квартира',
          value: 1
        },
      ),
      type: [
        {
          label: 'Квартира',
          value: 1
        },
        {
          label: 'Офис',
          value: 2
        },
        {
          label: 'Коттедж',
          value: 3
        },
        {
          label: 'Бар',
          value: 4
        }
      ],
      premises: ref([
        {
          input: 'Кухня',
          s: 115
        },
        {
          input: 'Прихожая',
          s: 5
        },
        {
          input: 'Спальня',
          s: 13
        },
        {
          input: '',
          s: 0
        },
      ]),
      grafficOptopn,
      estimates,
      visual,
      text: ref('г. Краснодар, ул. Ленина, д. 15'),
      text2: ref('115'),
      text3: ref(''),
      text4: ref(''),
      text5: ref(''),
      maximizedToggle: ref(true),
      model: ref('Название'),
      options2: [
        'Имя',
        'Тип',
        'Площадь',
        'Заказчик',
        'Изменен',
        'Создан',
        'Сроки',
        'Оплата',
        'Готовность'
      ],
      modalFalse() {
        dialog.value = false
      }
    }
  }
}
</script>
