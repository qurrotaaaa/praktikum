<!-- src/components/InputModal.vue -->
<template>
    <ion-modal :is-open="isOpen" @did-dismiss="cancel">
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ editingId ? 'Edit' : 'Add' }} Katalog</ion-title>
                <ion-buttons slot="start">
                    <ion-button @click="cancel"><ion-icon :icon="close"></ion-icon></ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-item>
                <ion-input v-model="katalog.title" label="Title" label-placement="floating"
                    placeholder="Enter Title"></ion-input>
            </ion-item>
            <ion-item>
                <ion-textarea v-model="katalog.description" label="Description" label-placement="floating"
                    placeholder="Enter Description" :autogrow="true" :rows="3"></ion-textarea>
            </ion-item>
            <ion-row>
                <ion-col>
                    <ion-button type="button" @click="input" shape="round" color="primary" expand="block">
                        {{ editingId ? 'Edit' : 'Add' }} Katalog Mainan Andy
                    </ion-button>
                </ion-col>
            </ion-row>
        </ion-content>
    </ion-modal>
</template>
<script setup lang="ts">
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonInput, IonRow, IonCol, IonItem, IonContent, IonTextarea } from '@ionic/vue';
import { close } from 'ionicons/icons';
import { katalog } from '@/utils/firestore';

const props = defineProps<{
    isOpen: boolean,
    editingId: string | null,
    katalog: Omit<katalog, 'id' | 'createdAt' | 'updatedAt' | 'status'>
}>();

const emit = defineEmits<{
    'update:isOpen': [value: boolean],
    'update:editingId': [value: string | null],
    'submit': [item: Omit<katalog, 'id' | 'createdAt' | 'updatedAt' | 'status'>]
}>();

const cancel = () => {
    emit('update:isOpen', false);
    emit('update:editingId', null);
    props.katalog.title = '';
    props.katalog.description = '';
}
const input = () => {
    emit('submit', props.katalog);
    cancel();
}
</script>