<!-- modifikasi src/views/HomePage.vue tambahkan keseluruhan style -->
<style scoped>
ion-card,
ion-accordion-group {
  width: 100%;
}

ion-fab {
  margin: 25px;
}

.limited-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

ion-card-title.limited-text {
  -webkit-line-clamp: 1;
  line-clamp: 1;
}

ion-card-subtitle.limited-text {
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.scrollable-container {
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.accordion-container {
  --padding-start: 0;
  --inner-padding-end: 0;
}

ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
}

.scrollable-container::-webkit-scrollbar {
  width: 8px;
}

.scrollable-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.scrollable-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.scrollable-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>


<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

   <!-- modifikasi src/views/HomePage.vue pada bagian ion-content dalam template -->
<ion-content :fullscreen="true">
	<!-- komponen paling atas dari ion-content -->
	<ion-refresher slot="fixed" :pull-factor="0.5" :pull-min="100" :pull-max="200"
    @ionRefresh="handleRefresh($event)">
    <ion-refresher-content></ion-refresher-content>
  </ion-refresher>
  
  <!-- komponen utama di antara 2 komponen ini -->
  <!-- bagian refresher -->

<!-- active katalogs -->
<div class="scrollable-container">
  <ion-list>
    <ion-item-sliding v-for="katalog in activekatalogs" :key="katalog.id" :ref="(el) => setItemRef(el, katalog.id!)">
      <ion-item-options side="start" @ionSwipe="handleDelete(katalog)">
        <ion-item-option color="danger" expandable @click="handleDelete(katalog)">
          <ion-icon slot="icon-only" :icon="trash" size="large"></ion-icon>
        </ion-item-option>
      </ion-item-options>

      <ion-item>
        <ion-card>
          <ion-card-header>
            <ion-card-title class="ion-text-wrap limited-text">{{ katalog.title }}</ion-card-title>
            <ion-card-subtitle class="limited-text">{{ katalog.description }}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <ion-badge>{{ getRelativeTime(katalog.updatedAt) }}</ion-badge>
          </ion-card-content>
        </ion-card>
      </ion-item>

      <ion-item-options side="end" @ionSwipe="handleStatus(katalog)">
        <ion-item-option @click="handleEdit(katalog)">
          <ion-icon slot="icon-only" :icon="create" size="large"></ion-icon>
        </ion-item-option>
        <ion-item-option color="success" expandable @click="handleStatus(katalog)">
          <ion-icon slot="icon-only" :icon="checkmarkCircle" color="light" size="large"></ion-icon>
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
    <ion-item v-if="activekatalogs.length === 0" class="ion-text-center">
      <ion-label>No active katalogs</ion-label>
    </ion-item>
  </ion-list>
</div>

<!-- completed katalogs -->
<ion-item class="accordion-container">
  <ion-accordion-group>
    <ion-accordion value="first">
      <ion-item slot="header" color="light">
        <ion-label class="ion-text-center">Completed</ion-label>
      </ion-item>
      <div slot="content" class="scrollable-container">
        <ion-list>
          <ion-item-sliding v-for="katalog in completedkatalogs" :key="katalog.id" :ref="(el) => setItemRef(el, katalog.id!)">
            <ion-item-options side="start" @ionSwipe="handleDelete(katalog)">
              <ion-item-option color="danger" expandable @click="handleDelete(katalog)">
                <ion-icon slot="icon-only" :icon="trash" size="large"></ion-icon>
              </ion-item-option>
            </ion-item-options>

            <ion-item>
              <ion-card>
                <ion-card-header>
                  <ion-card-title class="ion-text-wrap limited-text">{{ katalog.title }}</ion-card-title>
                  <ion-card-subtitle class="limited-text">{{ katalog.description }}</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>
                  <ion-badge>{{ getRelativeTime(katalog.updatedAt) }}</ion-badge>
                </ion-card-content>
              </ion-card>
            </ion-item>

            <ion-item-options side="end" @ionSwipe="handleStatus(katalog)">
              <ion-item-option @click="handleEdit(katalog)">
                <ion-icon slot="icon-only" :icon="create" size="large"></ion-icon>
              </ion-item-option>
              <ion-item-option color="warning" expandable @click="handleStatus(katalog)">
                <ion-icon slot="icon-only" :icon="close" color="light" size="large"></ion-icon>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
          <ion-item v-if="completedkatalogs.length === 0" class="ion-text-center">
            <ion-label>No completed katalogs</ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-accordion>
  </ion-accordion-group>
</ion-item>

<!-- bagian tombol dan modal -->
  <!-- komponen paling bawah dari ion-content -->
  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button @click="isOpen = true;">
      <ion-icon :icon="add" size="large"></ion-icon>
    </ion-fab-button>
  </ion-fab>
  <InputModal v-model:isOpen="isOpen" v-model:editingId="editingId" :katalog="katalog" @submit="handleSubmit" />
</ion-content>

  </ion-page>
</template>

<!-- modifikasi src/views/HomePage.vue import semua komponen yang diperlukan -->
<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonBadge,
  IonIcon,
  IonFab,
  IonFabButton,
  IonAccordion,
  IonAccordionGroup,
  IonLabel,
  IonList,
  loadingController,
  IonRefresher,
  IonRefresherContent,
  toastController
} from '@ionic/vue';
import {
  add,
  checkmarkCircle,
  close,
  create,
  trash,
  closeCircle,
  warningOutline
} from 'ionicons/icons';
import InputModal from '@/components/InputModal.vue';
import { onMounted, ref, computed, onUnmounted } from 'vue';
import { firestoreService, type katalog } from '@/utils/firestore';
import { formatDistanceToNow } from 'date-fns';

// modifikasi src/views/HomePage.vue deklarasikan variabel yang akan digunakan
// modifikasi src/views/HomePage.vue deklarasikan variabel yang akan digunakan
const isOpen = ref(false);
const editingId = ref<string | null>(null);
const katalogs = ref<katalog[]>([]);
const katalog = ref<Omit<katalog, 'id' | 'createdAt' | 'updatedAt' | 'status'>>({
  title: '',
  description: '',
});
const activekatalogs = computed(() => katalogs.value.filter(katalog => !katalog.status));
const completedkatalogs = computed(() => katalogs.value.filter(katalog => katalog.status));
const itemRefs = ref<Map<string, HTMLIonItemSlidingElement>>(new Map());
let intervalId: any;
const timeUpdateTrigger = ref(0);

// mendapatkan value dari item
const setItemRef = (el: any, id: string) => {
  if (el) {
    itemRefs.value.set(id, el.$el);
  }
};

// toast notifikasi
const showToast = async (message: string, color: string = 'success', icon: string = checkmarkCircle) => {
  const toast = await toastController.create({
    message,
    duration: 2000,
    color,
    position: 'top',
    icon
  });
  await toast.present();
};

// mendapatkan perbedaan waktu
const getRelativeTime = (date: any) => {
  timeUpdateTrigger.value;
  try {
    const jsDate = date?.toDate ? date.toDate() : new Date(date);
    return formatDistanceToNow(jsDate, { addSuffix: true });
  } catch (error) {
    return 'Invalid date';
  }
};

// fungsi handleRefresh dan handleSubmit akan didefinisikan nanti
// handle swipe refresher
const handleRefresh = async (event: any) => {
  try {
    await loadkatalogs(false);
  } catch (error) {
    console.error('Error refreshing:', error);
  } finally {
    event.target.complete();
  }
};

// handle submit add/edit pada modal
const handleSubmit = async (katalog: Omit<katalog, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
  if (!katalog.title) {
    await showToast('Title is required', 'warning', warningOutline);
    return;
  }
  try {
    if (editingId.value) {
      await firestoreService.updatekatalog(editingId.value, katalog as katalog);
      await showToast('katalog updated successfully', 'success', checkmarkCircle);
    } else {
      await firestoreService.addkatalog(katalog as katalog);
      await showToast('katalog added successfully', 'success', checkmarkCircle);
    }
    loadkatalogs();
  } catch (error) {
    await showToast('An error occurred', 'danger', closeCircle);
    console.error(error);
  } finally {
    editingId.value = null;
  }
};

// load data
const loadkatalogs = async (isLoading = true) => {
  let loading;
  if (isLoading) {
    loading = await loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
  }

  try {
    katalogs.value = await firestoreService.getkatalogs();
  } catch (error) {
    console.error(error);
  } finally {
    if (loading) {
      await loading.dismiss();
    }
  }
};

// dijalankan setiap halaman diload, load data dan set interval update 1 menit
onMounted(() => {
  loadkatalogs();
  intervalId = setInterval(() => {
    timeUpdateTrigger.value++;
  }, 60000);
});

// reset interval update
onUnmounted(() => {
  clearInterval(intervalId);
});

// handle edit click
const handleEdit = async (editkatalog: katalog) => {
  const slidingItem = itemRefs.value.get(editkatalog.id!);
  await slidingItem?.close();

  editingId.value = editkatalog.id!;
  katalog.value = {
    title: editkatalog.title,
    description: editkatalog.description,
  }
  isOpen.value = true;
}

// handle delete click/swipe
const handleDelete = async (deletekatalog: katalog) => {
  try {
    await firestoreService.deletekatalog(deletekatalog.id!);
    await showToast('katalog deleted successfully', 'success', checkmarkCircle);
    loadkatalogs();
  } catch (error) {
    await showToast('Failed to delete katalog', 'danger', closeCircle);
    console.error(error);
  }
};

// handle status click/swipe, mengubah status katalog active (false)/completed (true)
const handleStatus = async (statuskatalog: katalog) => {
  const slidingItem = itemRefs.value.get(statuskatalog.id!);
  await slidingItem?.close();
  try {
    await firestoreService.updateStatus(statuskatalog.id!, !statuskatalog.status);
    await showToast(
      `katalog marked as ${!statuskatalog.status ? 'completed' : 'active'}`,
      'success',
      checkmarkCircle
    );
    loadkatalogs();
  } catch (error) {
    await showToast('Failed to update status', 'danger', closeCircle);
    console.error(error);
  }
};
</script>
