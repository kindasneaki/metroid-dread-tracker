<template>
  <div class="settings-panel">
    <button class="settings-toggle" @click="open = !open">
      {{ open ? "▲ Settings" : "▼ Settings" }}
    </button>
    <div v-if="open" class="settings-body">
      <!-- Trick Level (SET-01) -->
      <section class="settings-section">
        <h3 class="settings-heading">Trick Level</h3>
        <label class="settings-label" for="trickLevel">
          {{ trickLevelLabel }}
        </label>
        <select
          id="trickLevel"
          class="settings-select"
          :value="settings.trickLevel"
          @change="setTrickLevel($event.target.value)"
        >
          <option value="0">0 — Disabled</option>
          <option value="1">1 — Beginner</option>
          <option value="2">2 — Intermediate</option>
          <option value="3">3 — Advanced</option>
          <option value="4">4 — Expert</option>
          <option value="5">5 — Hypermode</option>
        </select>
      </section>

      <!-- Misc Toggles (SET-02) -->
      <section class="settings-section">
        <h3 class="settings-heading">Misc Toggles</h3>
        <div v-for="flag in miscFlags" :key="flag.key" class="settings-row">
          <label class="settings-label">
            <input
              type="checkbox"
              class="settings-checkbox"
              :checked="settings.misc[flag.key] === 1"
              @change="setMisc(flag.key, $event.target.checked)"
            />
            {{ flag.label }}
          </label>
        </div>
      </section>

      <!-- Starting Inventory (SET-03) -->
      <section class="settings-section">
        <h3 class="settings-heading">Starting Inventory</h3>
        <div class="settings-row">
          <label class="settings-label" for="startMissiles"
            >Starting Missiles</label
          >
          <input
            id="startMissiles"
            type="number"
            class="settings-number"
            min="0"
            :value="settings.startingItems.MissileAmmo"
            @change="setStartingItem('MissileAmmo', $event.target.value)"
          />
        </div>
        <div class="settings-row">
          <label class="settings-label">
            <input
              type="checkbox"
              class="settings-checkbox"
              :checked="settings.startingItems.Slide === 1"
              @change="setStartingItem('Slide', $event.target.checked ? 1 : 0)"
            />
            Slide
          </label>
        </div>
        <div class="settings-row">
          <label class="settings-label">
            <input
              type="checkbox"
              class="settings-checkbox"
              :checked="settings.startingItems.Pulse === 1"
              @change="setStartingItem('Pulse', $event.target.checked ? 1 : 0)"
            />
            Pulse Radar
          </label>
        </div>
        <div class="settings-row">
          <label class="settings-label" for="startEnergyTanks"
            >Energy Tanks</label
          >
          <input
            id="startEnergyTanks"
            type="number"
            class="settings-number"
            min="0"
            :value="settings.startingItems.ETank || 0"
            @change="setStartingItem('ETank', $event.target.value)"
          />
        </div>
      </section>

      <!-- Energy Params (SET-03, advanced) — no energy_per_tank control (W3) -->
      <section class="settings-section">
        <h3 class="settings-heading">Energy Params</h3>
        <div class="settings-row">
          <label class="settings-label">
            <input
              type="checkbox"
              class="settings-checkbox"
              :checked="settings.immediateParts"
              @change="setImmediateParts($event.target.checked)"
            />
            Immediate Parts
          </label>
        </div>
        <div class="settings-row">
          <label class="settings-label" for="strictness"
            >Damage Strictness</label
          >
          <select
            id="strictness"
            class="settings-select"
            :value="settings.strictness"
            @change="setStrictness($event.target.value)"
          >
            <option value="1">1.0 — Lax</option>
            <option value="1.5">1.5 — Normal</option>
            <option value="2">2.0 — Strict</option>
          </select>
        </div>
      </section>

      <!-- Reset Progress -->
      <section class="settings-section">
        <button class="settings-reset" @click="resetProgress">
          Reset Progress
        </button>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

const MISC_FLAGS = [
  { key: "DoorLocks", label: "Door Locks" },
  { key: "HighDanger", label: "High Danger" },
  { key: "NerfPowerBombs", label: "Nerf Power Bombs" },
  { key: "Teleporters", label: "Teleporters" },
  { key: "SeparateBeams", label: "Separate Beams" },
  { key: "SeparateMissiles", label: "Separate Missiles" },
];

const TRICK_LABELS = [
  "0 — Disabled",
  "1 — Beginner",
  "2 — Intermediate",
  "3 — Advanced",
  "4 — Expert",
  "5 — Hypermode",
];

// Fallback settings shape for before the GameModel has loaded.
const FALLBACK_SETTINGS = {
  trickLevel: 0,
  misc: {
    SeparateBeams: 0,
    SeparateMissiles: 0,
    DoorLocks: 0,
    HighDanger: 0,
    Teleporters: 0,
    NerfPowerBombs: 1,
  },
  energyPerTank: 100,
  immediateParts: true,
  strictness: 1.5,
  startingItems: {
    MissileLauncher: 1,
    MissileAmmo: 15,
    Pulse: 1,
    Slide: 1,
  },
};

export default {
  name: "SettingsPanel",

  data() {
    return {
      open: false,
      miscFlags: MISC_FLAGS,
    };
  },

  computed: {
    ...mapState("logic", {
      rawSettings: (state) => state.settings,
    }),

    /** Guard: fall back to defaults when settings is null (pre-load). */
    settings() {
      if (!this.rawSettings) return FALLBACK_SETTINGS;
      return {
        ...FALLBACK_SETTINGS,
        ...this.rawSettings,
        misc: { ...FALLBACK_SETTINGS.misc, ...(this.rawSettings.misc || {}) },
        startingItems: {
          ...FALLBACK_SETTINGS.startingItems,
          ...(this.rawSettings.startingItems || {}),
        },
      };
    },

    trickLevelLabel() {
      return TRICK_LABELS[this.settings.trickLevel] || TRICK_LABELS[0];
    },
  },

  methods: {
    setTrickLevel(value) {
      this.$store.dispatch("logic/setSettings", {
        trickLevel: Number(value),
      });
    },

    setMisc(flag, checked) {
      this.$store.dispatch("logic/setSettings", {
        misc: { [flag]: checked ? 1 : 0 },
      });
    },

    setStartingItem(key, value) {
      const numericKeys = ["MissileAmmo", "ETank"];
      this.$store.dispatch("logic/setSettings", {
        startingItems: {
          [key]: numericKeys.includes(key) ? Number(value) || 0 : value,
        },
      });
    },

    setImmediateParts(checked) {
      this.$store.dispatch("logic/setSettings", {
        immediateParts: checked,
      });
    },

    setStrictness(value) {
      this.$store.dispatch("logic/setSettings", {
        strictness: Number(value),
      });
    },

    resetProgress() {
      if (window.confirm("Reset all progress? This cannot be undone.")) {
        this.$store.dispatch("resetProgress");
      }
    },
  },
};
</script>

<style scoped>
.settings-panel {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 12px;
  color: #92a5b8;
}

.settings-toggle {
  display: block;
  background: #0b131a;
  color: #92a5b8;
  border: 1px solid #92a5b8;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 12px;
  width: 100%;
  text-align: right;
}

.settings-body {
  background: #0b131a;
  border: 1px solid #92a5b8;
  border-top: none;
  padding: 8px 12px;
  width: 220px;
  max-height: 80vh;
  overflow-y: auto;
}

.settings-section {
  margin-bottom: 12px;
}

.settings-heading {
  color: #92a5b8;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 6px 0;
  border-bottom: 1px solid #1e2d3a;
  padding-bottom: 2px;
}

.settings-label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #92a5b8;
}

.settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.settings-select {
  background: #0b131a;
  color: #92a5b8;
  border: 1px solid #92a5b8;
  padding: 2px 4px;
  font-size: 11px;
  width: 100%;
  margin-top: 4px;
}

.settings-number {
  background: #0b131a;
  color: #92a5b8;
  border: 1px solid #92a5b8;
  padding: 2px 4px;
  font-size: 11px;
  width: 60px;
  text-align: right;
}

.settings-checkbox {
  display: inline-block;
  width: auto;
  cursor: pointer;
  accent-color: #42b983;
}

.settings-reset {
  background: #1a0b0b;
  color: #e05555;
  border: 1px solid #e05555;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 11px;
  width: 100%;
}

.settings-reset:hover {
  background: #2a1010;
}
</style>
