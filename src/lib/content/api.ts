import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  writeBatch,
  type DocumentData,
} from "firebase/firestore";

import { requireDb } from "@/lib/firebase";
import {
  defaultFeatures,
  defaultProjects,
  defaultSiteContent,
  defaultSkillBars,
  defaultSkillGroups,
  defaultTestimonials,
} from "./defaults";
import type {
  CollectionName,
  Feature,
  Project,
  SiteContent,
  SkillBar,
  SkillGroup,
  Testimonial,
} from "./types";

const SITE_COLLECTION = "site";
const SITE_DOC_ID = "main";

export type CollectionMap = {
  projects: Project;
  features: Feature;
  skillGroups: SkillGroup;
  skillBars: SkillBar;
  testimonials: Testimonial;
};

export type CollectionDefaults = {
  [K in CollectionName]: CollectionMap[K][];
};

export const COLLECTION_DEFAULTS: CollectionDefaults = {
  projects: defaultProjects,
  features: defaultFeatures,
  skillGroups: defaultSkillGroups,
  skillBars: defaultSkillBars,
  testimonials: defaultTestimonials,
};

function withId<T extends { id: string }>(docId: string, data: DocumentData): T {
  // Spread the doc id last so a stray `id` field in the document can't shadow it.
  return { ...(data as Omit<T, "id">), id: docId } as T;
}

async function fetchCollection<K extends CollectionName>(name: K): Promise<CollectionMap[K][]> {
  const db = requireDb();
  const snapshot = await getDocs(query(collection(db, name), orderBy("order")));
  if (snapshot.empty) return COLLECTION_DEFAULTS[name];
  return snapshot.docs.map((entry) => withId<CollectionMap[K]>(entry.id, entry.data()));
}

export async function fetchProjects(): Promise<Project[]> {
  return fetchCollection("projects");
}

export async function fetchFeatures(): Promise<Feature[]> {
  return fetchCollection("features");
}

export async function fetchSkillGroups(): Promise<SkillGroup[]> {
  return fetchCollection("skillGroups");
}

export async function fetchSkillBars(): Promise<SkillBar[]> {
  return fetchCollection("skillBars");
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  return fetchCollection("testimonials");
}

export async function fetchSiteContent(): Promise<SiteContent> {
  const db = requireDb();
  const snapshot = await getDoc(doc(db, SITE_COLLECTION, SITE_DOC_ID));
  if (!snapshot.exists()) return defaultSiteContent;
  const data = snapshot.data() as Partial<SiteContent>;
  return {
    hero: { ...defaultSiteContent.hero, ...data.hero },
    about: { ...defaultSiteContent.about, ...data.about },
    experience: { ...defaultSiteContent.experience, ...data.experience },
    contact: { ...defaultSiteContent.contact, ...data.contact },
  };
}

export async function createEntity<K extends CollectionName>(
  name: K,
  data: Omit<CollectionMap[K], "id">,
): Promise<string> {
  const db = requireDb();
  const { id: _ignored, ...rest } = data as CollectionMap[K];
  const ref = await addDoc(collection(db, name), rest);
  return ref.id;
}

export async function updateEntity<K extends CollectionName>(
  name: K,
  id: string,
  data: Partial<CollectionMap[K]>,
): Promise<void> {
  const db = requireDb();
  const { id: _ignored, ...rest } = data as CollectionMap[K];
  // setDoc+merge upserts, so editing a default (not-yet-persisted) item still works.
  await setDoc(doc(db, name, id), rest, { merge: true });
}

export async function deleteEntity(name: CollectionName, id: string): Promise<void> {
  const db = requireDb();
  await deleteDoc(doc(db, name, id));
}

/** Rewrites the `order` field of every document from the given id sequence. */
export async function reorderEntities(name: CollectionName, ids: string[]): Promise<void> {
  const db = requireDb();
  const batch = writeBatch(db);
  ids.forEach((id, index) => {
    batch.set(doc(db, name, id), { order: index }, { merge: true });
  });
  await batch.commit();
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  const db = requireDb();
  await setDoc(doc(db, SITE_COLLECTION, SITE_DOC_ID), content, { merge: true });
}
