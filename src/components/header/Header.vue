<template>
  <div id="nav">
<!--
<b-navbar toggleable="md" type="dark" variant="info">
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
  <b-navbar-brand href="#">     Application Praticient</b-navbar-brand>
  <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav>
      <b-nav-item href="#">
        <div class="smaller">
          <img src="../../assets/doctor01.svg">
          <img src="../../assets/doctor02.svg">
          <img src="../../assets/doctor03.svg">
          <img src="../../assets/doctor04.svg">
          <img src="../../assets/doctor05.svg">
        </div>
      </b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item right>
        <b-row>
          <b-col sm="1">
            <a class="fhir" href="https://www.hl7.org/fhir/">
            <img class="fhir-img" src="../../assets/fhir_logo.png">
            </a>
          </b-col>
        </b-row>
      </b-nav-item>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>


  -->
    <b-container fluid>
      <b-row>
        <b-col sm="1">
        </b-col>
        <b-col sm="3">
          <h2 class="title">Application Practicien</h2>
        </b-col>
        <b-col sm="5">
          <div class="smaller">
            <img src="../../assets/doctor01.svg">
            <img src="../../assets/doctor02.svg">
            <img src="../../assets/doctor03.svg">
          </div>
          <div class="smaller">
            <img src="../../assets/doctor04.svg">
            <img src="../../assets/doctor05.svg">
          </div>
        </b-col>
        <b-col sm="2">
          powered by:
        </b-col>
        <b-col sm="1">
          <a class="fhir" href="https://www.hl7.org/fhir/">
          <img class="fhir-img" src="../../assets/fhir_logo.png">
          <h2>Fhir</h2>
          </a>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
