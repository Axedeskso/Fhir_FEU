<template>
  <div id="LateralMenu">
    <div class="lat-menu">
      <div class="lat-menu-container">
        <router-link class="block" to="/">
            <div class="webkit first">
            <div class="fifty">
              <div class="menu-icon-border">
                <icon class="menu-icon" name="bars"></icon>
              </div>
            </div>
            <div class="center">
              <h3 class="menu-label">Menu</h3>
            </div>
          </div>
        </router-link>

        <router-link id="boop" class="block" to="/base">
          <div class="webkit">
            <div class="fifty">
              <icon class="menu-icon" name="free-code-camp"></icon>
            </div>
            <div>
              <div class="menu-text">Base de Données Fhir</div>
            </div>
          </div>
        </router-link>

        <router-link class="block" to="/ajout-utilisateur">
          <div class="webkit">
            <div class="fifty">
              <icon class="menu-icon" name="address-card"></icon>
            </div>
            <div>
              <div class="menu-text">Ajouter Utilisateur</div>
            </div>
          </div>
        </router-link>

        <router-link class="block" to="/rendez-vous">
          <div class="webkit">
          <div class="fifty">
            <icon class="menu-icon" name="handshake-o"></icon>
          </div>
          <div>
            <div class="menu-text">Rendez-vous</div>
          </div>
        </div>
        </router-link>

        <router-link class="block" to="/mise-a-jour">
        <div class="webkit">
          <div class="fifty">
            <icon class="menu-icon" name="superpowers"></icon>
          </div>
          <div>
            <div class="menu-text">Mise à jour</div>
          </div>
        </div>
        </router-link>

        <router-link class="block" to="/archive">
        <div class="webkit">
          <div class="fifty">
            <icon class="menu-icon" name="archive"></icon>
          </div>
          <div>
            <div class="menu-text">Archive</div>
          </div>
        </div>
        </router-link>

        <router-link class="block" to="/statistiques">
        <div class="webkit">
          <div class="fifty">
            <icon class="menu-icon" name="bar-chart"></icon>
          </div>
          <div>
            <div class="menu-text">Statistiques</div>
          </div>
        </div>
        </router-link>

        <router-link class="block" to="/legal">
        <div class="webkit">
          <div class="fifty">
            <icon class="menu-icon" name="university"></icon>
          </div>
          <div>
            <div class="menu-text">Légal</div>
          </div>
        </div>
        </router-link>
        <div class="vertical-bar"/>
      </div>
    </div>
    <div class="thinbar"/>
    <div class="thinbar2"/>
  </div>
</template>

<script>
  export default {
    name: 'LateralMenu',
    created () {
    }
  }
</script>
