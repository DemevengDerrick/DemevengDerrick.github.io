/**
 * Portfolio content — single source of truth.
 * This file is shared verbatim between DemevengDerrick.github.io and DemevengDerrick/maps,
 * so links to demos that only live in the root repo must stay absolute (see ROOT).
 */
(function () {
    const ROOT = 'https://demevengderrick.github.io/';
    const GH = 'https://github.com/DemevengDerrick/';
    const ASSET = 'https://github.com/user-attachments/assets/';

    const roles = {
        analyst: {
            label: 'Data Analyst',
            short: 'Analyst',
            summary: 'I turn surveillance, census and survey data into dashboards, indicators and stories that programme teams and executives act on.',
            focus: ['BI dashboards', 'Demographic & health indicators', 'M&E reporting', 'Data storytelling'],
            tools: ['Power BI', 'Tableau', 'Looker Studio', 'R / Shiny', 'Excel', 'BigQuery']
        },
        engineer: {
            label: 'Data Engineer',
            short: 'Engineer',
            summary: 'I design the pipelines, databases and tools that keep multi-country data flowing: clean, validated and on time.',
            focus: ['Automated ETL pipelines', 'Data quality frameworks', 'Spatial databases', 'APIs, plugins & toolboxes'],
            tools: ['Python', 'R', 'SQL', 'PostgreSQL / PostGIS', 'KNIME', 'Airflow', 'FastAPI', 'Microsoft Fabric']
        },
        spatial: {
            label: 'Spatial Data Scientist',
            short: 'Spatial',
            summary: 'I model where things happen and why: accessibility, hotspots, exposure and urbanisation, for public health and population programmes.',
            focus: ['Accessibility modelling', 'Hotspot & cluster statistics', 'Climate & hazard exposure', 'Remote sensing'],
            tools: ['ArcGIS Pro', 'QGIS', 'Google Earth Engine', 'GeoPandas', 'MapLibre / Leaflet', 'GDAL']
        }
    };

    const topics = {
        health: 'Public Health',
        demography: 'Demography',
        economy: 'Economics',
        environment: 'Environment & Climate',
        infrastructure: 'Data Infrastructure'
    };

    /*
     * Project fields:
     *  id, title, roles[], topic, year, summary (card), description (modal),
     *  tools[], image (optional), links[{label,url}] (optional)
     */
    const projects = [
        // ---------- Spatial Data Science ----------
        {
            id: 'emonc-malawi',
            title: 'EmONC Accessibility Modelling — Malawi',
            roles: ['spatial'], topic: 'health', year: '2025',
            summary: 'Real-time geographic accessibility modelling to prioritise Emergency Obstetric and Newborn Care facilities.',
            description: 'For UNFPA, I delivered real-time geospatial accessibility modelling for Malawi\'s Emergency Obstetric and Newborn Care (EmONC) prioritisation. Travel-time surfaces to facilities, combined with population distribution, showed where maternal and newborn services most needed strengthening. The approach was then taught to 50+ regional trainers and technical teams from more than 20 countries.',
            tools: ['AccessMod', 'ArcGIS Pro', 'WorldPop', 'Travel-time modelling']
        },
        {
            id: 'ssp-exposure',
            title: 'Climate Exposure Analysis',
            roles: ['spatial', 'engineer'], topic: 'environment', year: '2025',
            summary: 'How population exposure to climate hazards shifts under alternative futures.',
            description: 'A population exposure analysis that combines WorldPop population projections with the Degree of Urbanisation classification. It quantifies how many people, and which settlement types, are exposed to climate hazards today and under alternative futures. It is built as an end-to-end R pipeline that combines population, hazard and settlement layers.',
            tools: ['R', 'terra / sf', 'WorldPop', 'DEGURBA'],
            image: 'images/projects/climate-flood-exposure-nga.jpg',
            links: [{ label: 'Code', url: GH + 'climate_change' }]
        },
        {
            id: 'degurba',
            title: 'Degree of Urbanisation (DEGURBA) for SDG Tutorial',
            roles: ['spatial', 'engineer'], topic: 'demography', year: '2025',
            summary: 'A step-by-step tutorial on using DEGURBA to disaggregate SDG indicators by urban and rural areas.',
            description: 'A hands-on tutorial on applying the Degree of Urbanisation (DEGURBA) methodology to census and built-up data, then using the classification to disaggregate SDG indicators across cities, towns and rural areas. It comes with a notebook of SDG indicators and a companion tool that generates dummy microcensus data so the method can be practised without confidential data. The material grew out of supporting national statistics offices in Rwanda, Tanzania, Paraguay, Ghana and the Dominican Republic.',
            tools: ['GHSL', 'Census microdata', 'Python', 'R'],
            image: 'images/projects/degurba-sdg-tutorial.jpg',
            links: [
                { label: 'SDG indicators notebook', url: 'https://demevengderrick.github.io/DEGURBA/indicators_notebook_for_pdf.html' },
                { label: 'Dummy-data tutorial', url: 'https://demevengderrick.github.io/Degurba-dummy-data-creation/application%20of%20degurba%20to%20dummy%20microcensus%20data.html' }
            ]
        },
        {
            id: 'hotspot',
            title: 'Waterborne Disease Hotspot Analysis',
            roles: ['spatial'], topic: 'health', year: '2024',
            summary: 'Statistically significant clusters of disease burden across the WHO African Region.',
            description: 'I used spatial autocorrelation methods to find statistically significant clusters of high and low disease burden. High-confidence hotspots show where transmission is concentrated, which gives evidence for prioritising surveillance and resources.',
            tools: ['ArcGIS Pro', 'Getis-Ord Gi*', 'Spatial statistics'],
            image: ASSET + 'e30f9c3a-fb38-44c5-824e-fdd24cc75e46'
        },
        {
            id: 'disease-clusters',
            title: 'Disease-Specific Cluster Analysis (2019–2023)',
            roles: ['spatial'], topic: 'health', year: '2024',
            summary: 'Malaria, diarrhoea, dengue, cholera and typhoid hotspots across Africa.',
            description: 'A multi-panel spatial cluster analysis of major waterborne diseases (malaria, diarrhoea, dengue, cholera and typhoid) across the WHO African Region. Hotspots recur along river basins, lake regions and densely populated corridors, which points to links between water systems, environmental conditions and transmission.',
            tools: ['ArcGIS Pro', 'Cluster analysis', 'Small multiples'],
            image: ASSET + 'f3243f8c-450a-425d-99ae-e3d86c21994f'
        },
        {
            id: 'bivariate',
            title: 'Bivariate Map: Cases vs Deaths',
            roles: ['spatial', 'analyst'], topic: 'health', year: '2024',
            summary: 'Where high incidence coincides with high mortality.',
            description: 'The joint spatial distribution of disease cases and deaths across Africa, highlighting where high incidence coincides with high mortality. Darker shades mark priority hotspots with both a high health burden and high severity.',
            tools: ['ArcGIS Pro', 'Bivariate symbology'],
            image: ASSET + '4ce89cb4-ec17-4f75-882d-9f72fbc45ff4'
        },
        {
            id: 'waterborne-cases',
            title: 'Waterborne Disease Distribution in Africa',
            roles: ['spatial', 'analyst'], topic: 'health', year: '2024',
            summary: 'Geographic clustering of reported cases and inequities in burden.',
            description: 'The spatial distribution of reported disease cases across Africa, showing geographic clustering and hotspots of higher burden. Cases concentrate in specific regions, which reveals spatial inequities in both transmission and reporting.',
            tools: ['ArcGIS Pro', 'Choropleth mapping'],
            image: ASSET + '97d07e9c-0436-413e-b2d3-2ff33cb9987f'
        },
        {
            id: 'dpt1',
            title: 'DPT1 Vaccination Coverage — WHO AFRO 2022',
            roles: ['spatial', 'analyst'], topic: 'health', year: '2023',
            summary: 'Persistent inequities in routine immunisation and zero-dose children.',
            description: 'A choropleth of DPT1 vaccination coverage across the WHO African Region. Several countries exceed 90% coverage while others stay below 80%, which shows persistent inequities in routine immunisation and the need to reach zero-dose and under-immunised children.',
            tools: ['ArcGIS Pro', 'WUENIC'],
            image: ASSET + 'ac4b780e-efd0-464b-9e4e-c71326517387'
        },
        {
            id: 'immunisation-series',
            title: 'Routine Immunisation & Measles Series',
            roles: ['spatial', 'analyst'], topic: 'health', year: '2023',
            summary: 'DPT3, MCV1, MCV2 coverage and measles incidence across the African Region.',
            description: 'A consistent map series for regional reviews: DPT3, MCV1 and MCV2 coverage for 2022, and measles incidence for 2022 and 2023. Coverage gaps can be read side by side against the outbreaks that followed.',
            tools: ['ArcGIS Pro', 'Map series', 'Cartography'],
            image: 'images/projects/mcv1-coverage-2022.jpg',
            gallery: [
                'images/projects/dpt3-coverage-2022.jpg',
                'images/projects/mcv1-coverage-2022.jpg',
                'images/projects/mcv2-coverage-2022.jpg',
                'images/projects/measles-incidence-2022.jpg',
                'images/projects/measles-incidence-2023.jpg'
            ]
        },
        {
            id: 'es-sites',
            title: 'Polio Environmental Surveillance Site Maps',
            roles: ['spatial'], topic: 'health', year: '2024',
            summary: 'Enterovirus isolation rate per site across WHO AFRO epidemiological blocs.',
            description: 'Maps of enterovirus (EV) isolation rates for each environmental surveillance site, by epidemiological bloc (West, Central, Lake Chad, South-East). Variation in site performance points to locations with weak detection and guides action to improve sampling quality.',
            tools: ['R', 'ggplot2 / sf', 'PostGIS'],
            image: ASSET + '9856656d-2bb1-4228-a3f0-4246bd4956a0',
            gallery: [
                ASSET + '9856656d-2bb1-4228-a3f0-4246bd4956a0',
                'images/projects/es-sites-west.jpg',
                'images/projects/es-sites-central.jpg',
                'images/projects/es-sites-lake-chad.jpg'
            ]
        },
        {
            id: 'guinea',
            title: 'Active Surveillance & Under-15 Population — Guinea',
            roles: ['spatial'], topic: 'health', year: '2023',
            summary: 'Prioritised ISS/eSURV sites and target population by district.',
            description: 'Operational maps for Guinea: active surveillance (ISS/eSURV) sites classified by priority level, and the under-15 population per district used to size immunisation and surveillance activities.',
            tools: ['QGIS', 'ODK', 'Population grids'],
            image: 'images/projects/guinea-as.jpg',
            gallery: ['images/projects/guinea-as.jpg', 'images/projects/guinea-choropleth.jpg']
        },
        {
            id: 'dschang',
            title: 'Education Accessibility in Dschang, Cameroon',
            roles: ['spatial'], topic: 'infrastructure', year: '2024',
            summary: 'Walking vs motorised travel time to primary and secondary schools.',
            description: 'Accessibility modelling for primary and secondary schools under motorised and walking scenarios. Areas near urban cores have strong access, while peripheral and mountainous areas face much longer travel times. The results inform school placement and transport planning.',
            tools: ['AccessMod', 'QGIS', 'Cost-distance'],
            image: ASSET + 'c62be97b-ee3f-4f74-ac72-b9d29e055256'
        },
        {
            id: 'vegetation',
            title: 'Vegetation Extraction — Akwa Ibom, Nigeria',
            roles: ['spatial'], topic: 'environment', year: '2024',
            summary: 'Satellite-derived tree cover and contiguous patches ≥ 15 km².',
            description: 'A satellite-derived land-cover analysis that isolates tree vegetation from built-up areas and linear infrastructure. After removing roads and river corridors, it identifies contiguous patches of at least 15 km² as a baseline for conservation planning and environmental impact assessment.',
            tools: ['Remote sensing', 'ArcGIS Pro', 'Raster analysis'],
            image: ASSET + 'a6e93ac1-c3cd-41ff-b726-e00ab51fb66d',
            gallery: [ASSET + 'a6e93ac1-c3cd-41ff-b726-e00ab51fb66d', ASSET + '6ab24703-e7ff-46ae-98fd-9eb0a2fd4621']
        },
        {
            id: 'douala-flood',
            title: '3D Participatory Flood Map — Douala',
            roles: ['spatial'], topic: 'environment', year: '2021',
            summary: 'Interactive 3D web map of community-reported flood events.',
            description: 'An interactive 3D web application built on community flood data collected with QField/ODK in Douala, Cameroon. It grew out of the World Bank flood-risk data collection framework, which was recognised as cost effective and scalable.',
            tools: ['ArcGIS JS API', 'QField', 'ODK'],
            image: 'images/projects/douala-3d-flood-map.jpg',
            links: [{ label: 'Live map', url: ROOT + 'FinalProject/' }]
        },
        {
            id: 'yaounde-flood',
            title: 'Flood Risk Mapping — Yaoundé 5 & 7',
            roles: ['spatial'], topic: 'environment', year: '2021',
            summary: 'Leaflet web map with a custom-tiled basemap of flood-exposed areas.',
            description: 'A Leaflet web map of flood-prone areas in Yaoundé 5 and 7, served on a custom tiled basemap I generated myself, with interactive layers and basemap switching.',
            tools: ['Leaflet', 'TileMill tiles', 'GeoJSON'],
            image: 'images/projects/yaounde-flood-map.jpg',
            links: [{ label: 'Live map', url: ROOT + 'geog585/project7/' }]
        },
        {
            id: 'my-neighbourhood',
            title: 'My Neighbourhood — Reachability App',
            roles: ['spatial'], topic: 'infrastructure', year: '2023',
            summary: 'Click anywhere to compute reachability by time or distance and count nearby facilities.',
            description: 'A web application that computes the reachable area from any clicked location by travel time or distance and travel mode. It then lists the facilities inside that area with a bar chart of their distribution.',
            tools: ['Leaflet', 'Reachability API', 'Chart.js'],
            image: 'images/projects/my-neighbourhood.jpg',
            links: [
                { label: 'Live app', url: ROOT + 'mcda/' },
                { label: 'Code', url: GH + 'My-Neighbourhood' }
            ]
        },
        {
            id: 'cameroon-pop',
            title: 'Cameroon Population Estimate Web Map',
            roles: ['spatial'], topic: 'demography', year: '2021',
            summary: 'Interactive population estimates by administrative unit.',
            description: 'An ArcGIS JS API web map presenting population estimates across Cameroon\'s administrative units, with pop-ups and thematic styling.',
            tools: ['ArcGIS JS API'],
            links: [{ label: 'Live map', url: ROOT + 'project5/' }]
        },

        // ---------- Data Engineering ----------
        {
            id: 'polio-lab-etl',
            title: 'Polio Laboratory ETL — 16 Labs, 47 Countries',
            roles: ['engineer', 'analyst'], topic: 'health', year: '2024',
            summary: 'Automated R pipelines and validation for regional polio laboratory data.',
            description: 'At WHO AFRO, I designed and ran automated ETL pipelines in R that integrated laboratory and surveillance data from 16 laboratories across 47 countries. They came with data quality frameworks: automated validation checks and reporting that made the data behind regional decisions more timely and consistent. I also wrote the data specifications for the Web Information for Action (WebIFA) platform and supported its rollout.',
            tools: ['R', 'tidyverse', 'Validation rules', 'Automated reporting'],
            image: 'images/projects/polio-lab-workflow.jpg',
            links: [
                { label: 'Code', url: GH + 'Lab_data_management' },
                { label: 'Publication', url: 'https://www.researchgate.net/publication/394056317_Harnessing_laboratory_data_for_poliovirus_eradication_contributions_of_the_Africa_regional_polio_laboratory_data_management_team_2022_-_2024' }
            ]
        },
        {
            id: 'odkconnector',
            title: 'ODKConnector — QGIS Plugin',
            roles: ['engineer', 'spatial'], topic: 'infrastructure', year: '2022',
            summary: 'Published QGIS plugin that pulls ODK forms straight into QGIS.',
            description: 'ODKConnector connects QGIS to an Open Data Kit (ODK) server, retrieves form submissions and loads them as shapefile, GeoPackage or CSV layers. It is published on the official QGIS plugin repository and is used to scale electronic field data collection across 40+ countries.',
            tools: ['PyQGIS', 'Python', 'ODK Central API', 'Qt'],
            image: 'images/projects/odkconnector-plugin.jpg',
            links: [
                { label: 'QGIS plugin', url: 'https://plugins.qgis.org/plugins/odkconnector2/' },
                { label: 'Code', url: GH + 'ETL-Connector-for-ODK' }
            ]
        },
        {
            id: 'es-infra',
            title: 'Environmental Surveillance Geospatial Platform',
            roles: ['engineer', 'spatial'], topic: 'health', year: '2023',
            summary: 'Public catalogue of polio environmental surveillance sites and catchments across 48 countries.',
            description: 'The geospatial platform behind polio environmental surveillance (ES): site registries, catchment areas and population-coverage datasets, published as an interactive map catalogue. I managed the regional ES geospatial infrastructure for WHO AFRO on PostgreSQL/PostGIS. Regional ETL pipelines in KNIME and Python extracted surveillance data from ODK/ONA servers, then validated and loaded it.',
            tools: ['PostgreSQL / PostGIS', 'KNIME', 'Python', 'ODK / ONA'],
            image: 'images/projects/es-world-catalog.jpg',
            links: [{ label: 'ES catalogue', url: 'https://es.world/en/catalog?view=map' }]
        },
        {
            id: 'geosm',
            title: 'GeOSM Open Spatial Data Infrastructure',
            roles: ['engineer'], topic: 'infrastructure', year: '2020',
            summary: 'Scaled an open SDI from 1 to 20 African countries.',
            description: 'At SOGEFI, I led a small developer team that scaled the GeOSM open spatial data infrastructure from a single country to 20 African countries. I designed the PostgreSQL/PostGIS databases and deployed QGIS Server web-mapping services that publish thematic layers such as health, education, finance and environment.',
            tools: ['PostgreSQL / PostGIS', 'QGIS Server', 'OpenStreetMap', 'Python'],
            image: 'images/projects/geosm-cameroon.jpg',
            links: [{ label: 'GeOSM Cameroon', url: 'https://geosm.app/map/cameroon' }]
        },
        {
            id: 'reliefweb-airflow',
            title: 'ReliefWeb Job Pipeline (Airflow)',
            roles: ['engineer'], topic: 'infrastructure', year: '2025',
            summary: 'Daily DAG that pulls NGO jobs in Canada from ReliefWeb and emails a digest.',
            description: 'An Apache Airflow pipeline that queries the ReliefWeb API every day for NGO jobs in Canada, transforms and deduplicates the results, and sends a formatted email digest.',
            tools: ['Apache Airflow', 'Python', 'REST API', 'SMTP'],
            links: [{ label: 'Code', url: GH + 'apache-ariflow' }]
        },
        {
            id: 'odk2agol',
            title: 'ODK → ArcGIS Online Sync',
            roles: ['engineer'], topic: 'infrastructure', year: '2021',
            summary: 'Notebook pipeline that publishes ODK submissions as hosted feature layers.',
            description: 'A Python notebook pipeline that pulls submissions from ODK and publishes or updates them as ArcGIS Online hosted feature layers. It fed the real-time surveillance dashboards I built for the Gates Foundation.',
            tools: ['Python', 'ArcGIS API for Python', 'ODK'],
            links: [{ label: 'Code', url: GH + 'ODK2AGOL' }]
        },
        {
            id: 'arcgis-data-connector',
            title: 'ArcGIS Pro Data Connector Tool',
            roles: ['engineer', 'spatial'], topic: 'infrastructure', year: '2021',
            summary: 'An ArcGIS Pro tool that pulls GeOSM (OpenStreetMap-based) data straight into a map.',
            description: 'A Python script tool for ArcGIS Pro that connects to the GeOSM API and loads its OpenStreetMap-based thematic layers directly into ArcGIS Pro, with no manual download or conversion. The video below walks through it.',
            tools: ['ArcPy', 'ArcGIS Pro', 'GeOSM API', 'Python'],
            image: 'images/projects/arcgis-pro-data-connector.jpg',
            video: 'https://www.youtube.com/embed/CyjUxU_jM_w',
            links: [
                { label: 'Code', url: GH + 'GeSOM4ArcGIS' },
                { label: 'Demo video', url: 'https://www.youtube.com/watch?v=CyjUxU_jM_w' }
            ]
        },
        {
            id: 'clear',
            title: 'Clear — Total Station Data Cleaner',
            roles: ['engineer'], topic: 'infrastructure', year: '2023',
            summary: 'Cleans and geocodes Leica IDX files; available as a web app.',
            description: 'Clear cleans and geocodes IDX files from Leica total stations so survey data can go straight into GIS. A Streamlit version makes it available in the browser.',
            tools: ['Python', 'Streamlit'],
            image: 'images/projects/clear-idx-app.jpg',
            links: [
                { label: 'Web app', url: 'https://clearidx.streamlit.app/' },
                { label: 'Code', url: GH + 'clear-for-web' }
            ]
        },

        // ---------- Data Analysis ----------
        {
            id: 'es-dashboard',
            title: 'Environmental Surveillance Performance Dashboard',
            roles: ['analyst'], topic: 'health', year: '2024',
            summary: 'Site coverage, timeliness, sample quality and EV detection, March 2023 to March 2024.',
            description: 'A dashboard of environmental surveillance performance indicators for the WHO African Region (South-East bloc), March 2023 to March 2024. It monitors site coverage, sample collection, timeliness, sample quality and enterovirus detection to strengthen polio surveillance.',
            tools: ['R', 'Dashboard design', 'GPSAP indicators'],
            image: ASSET + '5db70c7a-1db1-41eb-825d-dc1823930a8a'
        },
        {
            id: 'mortality',
            title: 'Maternal, Under-5, Child & Infant Mortality',
            roles: ['analyst'], topic: 'demography', year: '2025',
            summary: 'Three decades of survival gains in Cameroon, and the stubborn neonatal gap.',
            description: 'Maternal, infant, neonatal and under-five survival in Cameroon improved substantially over the long term. Neonatal mortality fell more slowly, which highlights persistent risks in the first days of life and the need for sustained investment in maternal and newborn care.',
            tools: ['R', 'ggplot2', 'World Bank WDI'],
            image: ASSET + '49066f49-d7bd-4055-a792-1acf8472b524'
        },
        {
            id: 'birth-death',
            title: 'Cameroon Birth & Death Rates (1960–2024)',
            roles: ['analyst'], topic: 'demography', year: '2025',
            summary: 'A gradual demographic transition in one chart.',
            description: 'Long-term trends in Cameroon\'s crude birth and death rates, which show sustained natural population growth. Both rates decline steadily, reflecting a gradual demographic transition driven by better survival and health and slowly falling fertility.',
            tools: ['R', 'ggplot2'],
            image: ASSET + '99ef7470-9a81-45e2-a93e-8fc4ecb3dc9b'
        },
        {
            id: 'dependency',
            title: 'The Weight on Cameroon\'s Workers',
            roles: ['analyst'], topic: 'demography', year: '2025',
            summary: 'Dependency ratio and age structure, 1960–2024.',
            description: 'The demographic pressure on Cameroon\'s working-age population (15–64), which supports both a large child population and a slowly growing older one. It makes the case for job creation, productivity gains and stronger social protection.',
            tools: ['R', 'Population pyramids'],
            image: ASSET + '6594dc12-a00d-43d8-993f-d203a2b88517'
        },
        {
            id: 'hiv',
            title: 'HIV Among Youth 15–24 (1990–2024)',
            roles: ['analyst'], topic: 'health', year: '2025',
            summary: 'Falling incidence, persistent gender gap.',
            description: 'HIV incidence and prevalence among young people aged 15–24 in Cameroon. After a peak in the late 1990s and early 2000s both indicators decline, but prevalence stays consistently higher among young women, a disparity that needs targeted interventions.',
            tools: ['R', 'UNAIDS data'],
            image: ASSET + '1dd492d5-1a99-47d0-af9d-598ffa33da7f'
        },
        {
            id: 'gdp-cemac',
            title: 'GDP Growth: Cameroon vs CEMAC',
            roles: ['analyst'], topic: 'economy', year: '2025',
            summary: 'Steady growth vs volatile peers, 1960–2024.',
            description: 'A comparison of Cameroon\'s sustained, resilient growth with other CEMAC economies. Peer economies are more volatile, so Cameroon\'s steady trajectory has widened its lead in the sub-region.',
            tools: ['R', 'World Bank WDI'],
            image: ASSET + '4cc297ad-5676-40be-b325-3f267dfec8f6'
        },
        {
            id: 'gdp-regional',
            title: 'GDP Growth: Western & Central Africa',
            roles: ['analyst'], topic: 'economy', year: '2025',
            summary: 'Cameroon among the leading mid-sized economies.',
            description: 'Cameroon set against all Western and Central African countries. Nigeria dominates in absolute size, but Cameroon\'s expansion is steadier, placing it among the region\'s leading mid-sized economies.',
            tools: ['R', 'Time series'],
            image: ASSET + '65f71559-45a5-47ce-94a6-6794bc7255bd'
        },
        {
            id: 'gdp-proportional',
            title: 'Regional GDP — Proportional Symbols (2024)',
            roles: ['analyst', 'spatial'], topic: 'economy', year: '2025',
            summary: 'Economic concentration in Nigeria and a second tier.',
            description: 'National GDP shown with proportional symbols. Output is concentrated in Nigeria, with a second tier led by Cameroon, Ghana and Côte d\'Ivoire. A time series shows sustained regional growth since the early 2000s.',
            tools: ['ArcGIS Pro', 'Proportional symbols'],
            image: ASSET + 'b16b3292-aa30-4ada-b4e0-d7dc41533a9f'
        },
        {
            id: 'tableau-flood',
            title: 'Participatory Flood Mapping — Tableau',
            roles: ['analyst'], topic: 'environment', year: '2021',
            summary: 'Interactive Tableau story of community-reported floods in Douala.',
            description: 'A Tableau Public dashboard exploring participatory flood data from Douala, Cameroon: where floods occur, how often and how severe they are.',
            tools: ['Tableau'],
            image: 'images/projects/tableau-douala-flood.jpg',
            links: [{ label: 'Tableau Public', url: 'https://public.tableau.com/views/lab9FinalProject/Participatoryfloodmapping' }]
        },
        {
            id: 'linkedin-analysis',
            title: 'LinkedIn Engagement Analysis',
            roles: ['analyst'], topic: 'infrastructure', year: '2024',
            summary: 'What drives reach and engagement on professional content.',
            description: 'An R analysis of my own LinkedIn post performance (impressions, engagement and timing), published as a static report.',
            tools: ['R', 'Quarto / R Markdown'],
            image: 'images/projects/linkedin-dashboard.jpg',
            links: [
                { label: 'Report', url: 'https://demevengderrick.github.io/LinkedIn_analysis/linkedIn_dashboard.html' },
                { label: 'Code', url: GH + 'LinkedIn_analysis' }
            ]
        },
        {
            id: 'pacific',
            title: 'Pacific Ocean Countries',
            roles: ['spatial'], topic: 'demography', year: '2025',
            summary: 'The vast oceanic scale of small island states.',
            description: 'Pacific Ocean countries alongside Australia and New Zealand, illustrating how widely the small island states are dispersed. The map highlights the scale, isolation and logistical complexity that shape development planning in the region.',
            tools: ['ArcGIS Pro', 'Pacific-centred projection'],
            image: ASSET + 'e0604083-8703-4028-8529-54847d2ccb58'
        }
    ];

    const experience = [
        {
            role: 'Programme Specialist, Geospatial Analysis',
            org: 'United Nations Population Fund (UNFPA)',
            place: '',
            period: 'Mar 2025 — Present',
            logo: 'images/brand/unfpa.png',
            roles: ['spatial', 'engineer', 'analyst'],
            summary: 'I lead the design and operation of geospatial and data analytics frameworks for population intelligence, service accessibility and vulnerability analysis across UNFPA\'s global programmes.',
            highlights: [
                'Delivered real-time accessibility modelling for Malawi\'s EmONC prioritisation.',
                'Built an SSP population exposure model combining WorldPop scenarios with DEGURBA.',
                'Supported the DEGURBA rollout with NSOs in Rwanda, Tanzania, Paraguay, Ghana and the Dominican Republic.',
                'Architected an enterprise GIS monitoring system and cost plan that cut licensing costs by ~70% and hosting costs by ~50%.',
                'Developed a global census monitoring platform in Power BI.',
                'Trained 50+ regional trainers from 20+ countries; guided census and survey data integration into the UNFPA Population Data Portal.'
            ]
        },
        {
            role: 'Data Analyst, Polio Surveillance & Data Systems',
            org: 'World Health Organization — Regional Office for Africa',
            place: 'Brazzaville, Congo',
            period: 'Jan 2024 — Feb 2025',
            logo: 'images/brand/WHO.jpg',
            roles: ['engineer', 'analyst'],
            summary: 'I led the design and optimisation of data pipelines, quality frameworks and analytics workflows for regional polio surveillance.',
            highlights: [
                'Automated R ETL pipelines integrating data from 16 labs across 47 countries.',
                'Data quality frameworks with automated validation checks and reporting.',
                'Authored the data specifications for the WebIFA platform and supported its rollout across 47 countries.'
            ]
        },
        {
            role: 'GIS Analyst, Disease Surveillance & Spatial Analytics',
            org: 'World Health Organization — Regional Office for Africa',
            place: 'Brazzaville, Congo',
            period: 'Jan 2021 — Dec 2023',
            logo: 'images/brand/WHO.jpg',
            roles: ['spatial', 'engineer', 'analyst'],
            summary: 'I integrated geospatial analytics into poliovirus surveillance and immunisation systems for risk assessment, planning and performance monitoring.',
            highlights: [
                'Hotspot and coverage analyses for monthly risk assessments and weekly operational reviews.',
                'A regional geospatial M&E dashboard aligned with the Global Polio Surveillance Action Plan.',
                'Managed the ES geospatial infrastructure (site registries, catchments, coverage) on PostGIS and KNIME.',
                'Built Python tools, an ArcGIS Pro toolbox and a QGIS plugin; scaled electronic field data collection to 40+ countries.'
            ]
        },
        {
            role: 'GIS Analyst',
            org: 'Bill & Melinda Gates Foundation',
            place: 'Brazzaville, Congo',
            period: 'Jun 2020 — Dec 2020',
            logo: 'images/brand/gates_foundation.png',
            roles: ['spatial', 'analyst'],
            summary: 'I strengthened disease surveillance and outbreak response with geospatial and data-driven approaches.',
            highlights: [
                'Scaled ODK-based environmental surveillance across Mauritania, Burkina Faso, Benin and Chad.',
                'Built ArcGIS Online dashboards giving real-time visibility into surveillance performance.'
            ]
        },
        {
            role: 'Geomatics Project Manager',
            org: 'SOGEFI',
            place: 'Yaoundé, Cameroon',
            period: 'Aug 2019 — May 2020',
            logo: 'images/brand/SOGEFI2.jpg',
            roles: ['engineer', 'spatial'],
            summary: 'I led geospatial data infrastructure and analytics for development, humanitarian and infrastructure projects.',
            highlights: [
                'Scaled the GeOSM open SDI from 1 to 20 African countries (PostGIS, QGIS Server).',
                'Disaster risk reduction analyses for the World Bank and GIZ: flood risk, accessibility, exposure.',
                'Designed a QField/ODK community data collection framework the World Bank recognised as cost effective and scalable.'
            ]
        },
        {
            role: 'Survey & Geomatics Engineer',
            org: 'SGDS International · Group Galant and Friends',
            place: 'Yaoundé, Cameroon',
            period: '2017 — 2019',
            logo: 'images/brand/SGDS_International.png',
            roles: ['spatial'],
            summary: 'I delivered geodetic and topographic surveying for national infrastructure and reference networks.',
            highlights: [
                'GNSS geodetic network densification and least-squares adjustment.',
                'Drone and total-station surveys of road corridors, producing orthomosaics, DEMs and point clouds.'
            ]
        }
    ];

    const education = [
        { degree: 'MSc, Spatial Data Science', note: 'with Graduate Certificate in Geospatial Programming & Web Map Development', school: 'Pennsylvania State University, USA', year: '2023' },
        { degree: 'Professional Certificate, Data Engineering', school: 'Massachusetts Institute of Technology, USA', year: '2025' },
        { degree: 'MEng, Land Surveying', school: 'National Advanced School of Public Works, Cameroon', year: '2017' }
    ];

    const certifications = [
        'Monitoring & Evaluation — ITCILO',
        'Introduction to Big Data — UC San Diego',
        'Machine Learning — Stanford',
        'TensorFlow for AI & ML — DeepLearning.AI'
    ];

    const awards = [
        'Esri Special Achievement in GIS (SAG) Award — 2024',
        'African Young Surveyor — International Federation of Surveyors (FIG), 2019',
        'FIG Foundation Grant — 2019'
    ];

    const publications = [
        {
            title: 'Harnessing laboratory data for poliovirus eradication',
            sub: 'Contributions of the Africa regional polio laboratory data management team, 2022–2024',
            venue: 'Journal article', year: '2024',
            url: 'https://www.researchgate.net/publication/394056317_Harnessing_laboratory_data_for_poliovirus_eradication_contributions_of_the_Africa_regional_polio_laboratory_data_management_team_2022_-_2024'
        },
        {
            title: 'Geographic information system and information visualization capacity building',
            sub: 'Polio eradication and challenges in the COVID-19 era for WHO\'s African region',
            venue: 'PLOS ONE', year: '2024',
            url: 'https://doi.org/10.1371/journal.pone.0307001'
        },
        {
            title: 'Mapping livestock systems, bovine and caprine diseases in Mayo-Kebbi Ouest Province, Chad',
            venue: 'Geospatial Health', year: '2025',
            url: 'https://doi.org/10.4081/gh.2025.1365'
        },
        {
            title: 'Modelling geographic accessibility of primary health care facilities in Bauchi LGA',
            venue: 'Texila International Journal of Academic Research', year: '2023',
            url: 'https://www.researchgate.net/publication/367562710_Modelling_Geographic_Accessibility_of_Primary_Health_Care_Facilities_in_Bauchi_Local_Government_Area'
        },
        {
            title: 'Space-time analysis of poliovirus outbreak in the African region',
            sub: 'Kulldorff\'s scan statistics and emerging hotspot analysis',
            venue: 'MSc thesis, Penn State', year: '2023',
            url: 'https://www.researchgate.net/publication/383155831_Space-time_analysis_of_poliovirus_outbreak_in_the_African_region_using_Kulldorff\'s_scan_statistics_and_Emerging_hotspot_analysis'
        },
        {
            title: 'Estimation of land subsidence using multitemporal SAR interferometry and GNSS data',
            venue: 'MEng thesis, ENSTP Yaoundé', year: '2017',
            url: 'https://www.researchgate.net/publication/373071609_ESTIMATION_OF_LAND_SUBSIDENCE_USING_MULTITEMPORAL_SYNTHETIC_APETURE_RADAR_INTERFEROMETRY_AND_GNSS_DATA'
        }
    ];

    // Earlier / academic work — compact list. Images open in the lightbox, links open in a new tab.
    const archive = [
        { title: 'US 2020 Presidential Elections', kind: 'ArcGIS JS API', url: ROOT + 'project7/' },
        { title: 'Message in a Bottle', kind: 'ArcGIS JS API', url: ROOT + 'MIB/' },
        { title: 'ArcGIS Online Web Map', kind: 'ArcGIS Online', url: ROOT + 'lesson1/' },
        { title: 'Cameroon OpenStreetMap Data', kind: 'ArcGIS Online', url: 'https://pennstate.maps.arcgis.com/apps/View/index.html?webmap=7b7e5d79bf5a47ee9fb5d66fe76c8272' },
        { title: 'My Home Location', kind: 'CodePen', url: 'https://codepen.io/derrickdemeveng/pen/JjbzGWO' },
        { title: 'Gray-scale Map of Lake Charles, Louisiana', kind: 'Cartography', image: 'images/archive/lab2.jpg' },
        { title: 'US 2019 Census — Proportional Symbols', kind: 'Cartography', image: 'images/archive/dot-density.jpg' },
        { title: 'US 2019 Census — Dot Density', kind: 'Cartography', image: 'images/archive/lab3.jpg' },
        { title: 'Departure Flights from Heathrow', kind: 'Flow mapping', image: 'images/archive/layout-1.jpg' },
        { title: 'Heathrow Flights by Time of Day', kind: 'Flow mapping', image: 'images/archive/layout-11.jpg' },
        { title: 'Heathrow to Popular Destinations', kind: 'Flow mapping', image: 'images/archive/layout-12.jpg' },
        { title: 'Paradise Valley Trail Run', kind: 'Terrain & profile', image: 'images/archive/layout-1b.jpg' },
        { title: 'New England Health Insurance Rate', kind: 'Sequential choropleth', image: 'images/archive/sequential.jpg' },
        { title: 'Health Insurance — Variant', kind: 'Sequential choropleth', image: 'images/archive/sequential-2.jpg' },
        { title: 'Diverging Choropleth', kind: 'Diverging scheme', image: 'images/archive/divergent.jpg' },
        { title: 'World Happiness — GDP per Person', kind: 'Thematic series', image: 'images/archive/happiness-gdp.jpg' },
        { title: 'World Happiness — Generosity', kind: 'Thematic series', image: 'images/archive/happiness-generosity.jpg' },
        { title: 'World Happiness — Freedom to Make Choices', kind: 'Thematic series', image: 'images/archive/happiness-freedom.jpg' },
        { title: 'World Happiness — Social Support', kind: 'Thematic series', image: 'images/archive/happiness-social-support.jpg' }
    ];

    const countries = {
        MRT: ['Mauritania', [20.3, -10.5]], SEN: ['Senegal', [14.5, -14.5]], GMB: ['Gambia', [13.5, -15.5]],
        GHA: ['Ghana', [7.9, -1.0]], CIV: ["Côte d'Ivoire", [7.5, -5.5]], TGO: ['Togo', [8.6, 0.8]],
        BEN: ['Benin', [9.3, 2.3]], NGA: ['Nigeria', [9.1, 8.7]], BFA: ['Burkina Faso', [12.2, -1.5]],
        CMR: ['Cameroon', [5.9, 12.4]], GAB: ['Gabon', [-0.8, 11.6]], TCD: ['Chad', [15.5, 19.0]],
        COG: ['Republic of Congo', [-0.2, 15.8]], COD: ['DR Congo', [-4.0, 21.8]], KEN: ['Kenya', [-0.5, 38.0]],
        TZA: ['Tanzania', [-6.4, 34.9]], MWI: ['Malawi', [-13.3, 34.3]], MDG: ['Madagascar', [-18.9, 46.9]],
        RWA: ['Rwanda', [-1.9, 29.9]], ETH: ['Ethiopia', [9.1, 40.5]], PRY: ['Paraguay', [-23.4, -58.4]],
        QAT: ['Qatar', [25.4, 51.2]], DOM: ['Dominican Republic', [18.7, -70.2]], USA: ['United States', [37.1, -95.7]],
        CAN: ['Canada', [56.1, -106.3]], ALB: ['Albania', [41.15, 20.17]]
    };

    const tools = ['ArcGIS Pro', 'QGIS', 'PostGIS', 'Python', 'R', 'SQL', 'KNIME', 'Power BI', 'Tableau',
        'Google Earth Engine', 'MapLibre GL', 'Leaflet', 'GeoPandas', 'Airflow', 'FastAPI', 'BigQuery',
        'Microsoft Fabric', 'ODK', 'QField', 'GDAL'];

    window.PORTFOLIO = { roles, topics, projects, experience, education, certifications, awards, publications, archive, countries, tools };
})();
