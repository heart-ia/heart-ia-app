import {
  Activity,
  ArrowRight,
  BarChart2,
  BookOpen,
  Brain,
  ChevronRight,
  Database,
  Heart,
  Shield,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

import heroImage from '@/assets/hero-image.png';
import logo from '@/assets/logo.png';

export function HomePage() {
  return (
    <div className="flex w-full flex-col items-center">
      {/* Hero Section */}
      <section className="animate-fade-in mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 px-4 py-12 md:flex-row md:py-24">
        <div className="flex-1 space-y-6">
          <div className="animate-slide-up flex items-center gap-3">
            <img src={logo} alt="Heart-IA Logo" className="h-10 w-auto" />
            <h1 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
              Heart-<span className="text-destructive">IA</span>
            </h1>
          </div>
          <h2 className="text-foreground/80 animate-slide-up animate-delay-100 text-2xl font-medium md:text-3xl">
            L'intelligence artificielle au service de votre santé cardiaque
          </h2>
          <p className="text-muted-foreground animate-slide-up animate-delay-200 max-w-xl text-lg">
            Grâce à l'analyse de plus de{' '}
            <strong>70 000 dossiers médicaux</strong>, Heart-IA prédit les
            risques cardiovasculaires en temps réel. Un outil{' '}
            <strong>éducatif</strong>, <strong>prédictif</strong> et{' '}
            <strong>accessible à tous</strong>.
          </p>
          <div className="animate-slide-up animate-delay-300 flex flex-wrap gap-4 pt-4">
            <Button
              size="lg"
              className="bg-destructive hover:bg-destructive/90"
            >
              Tester la démo
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="text-muted-foreground animate-slide-up animate-delay-400 flex items-center gap-2 text-sm">
            <Heart className="text-destructive h-4 w-4" />
            <span>Parce que chaque battement compte.</span>
          </div>
        </div>
        <div className="animate-fade-in animate-delay-300 flex flex-1 justify-center md:justify-end">
          <img
            src={heroImage}
            alt="Illustration d'un cœur avec des données médicales"
            className="h-auto max-w-full rounded-lg"
          />
        </div>
      </section>
      {/* Context Section */}
      <Separator className="mx-auto my-8 w-full max-w-7xl" />
      <section className="animate-fade-in animate-delay-400 mx-auto w-full max-w-7xl px-4 py-12">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <div className="flex-1 space-y-6">
            <h2 className="animate-slide-up text-3xl font-bold tracking-tight">
              Pourquoi Heart-IA ?
            </h2>
            <p className="text-muted-foreground animate-slide-up animate-delay-100 text-lg">
              Les maladies cardiovasculaires (MCV) sont responsables de plus de
              <strong> 18 millions de décès par an</strong>, soit
              <strong> 1 décès sur 3 dans le monde</strong>.
            </p>
            <p className="text-muted-foreground animate-slide-up animate-delay-200 text-lg">
              Pourtant, une grande partie de ces maladies peuvent être
              <strong> prévues</strong> et <strong>évitées</strong> grâce à une
              détection précoce et une meilleure compréhension des facteurs de
              risque.
            </p>
            <div className="bg-secondary border-border animate-slide-up animate-delay-300 rounded-lg border p-4">
              <h3 className="mb-2 text-xl font-medium">
                Heart-IA, c'est quoi ?
              </h3>
              <p className="text-muted-foreground">
                C'est une application éducative basée sur l'intelligence
                artificielle qui vise à :
              </p>
              <ul className="mt-2 space-y-2">
                <li className="flex items-start gap-2">
                  <Activity className="mt-0.5 h-5 w-5 text-[#e11d48]" />
                  <span>
                    <strong>Prédire le risque de maladie cardiaque</strong> à
                    partir de données simples : âge, tension, cholestérol, etc.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="mt-0.5 h-5 w-5 text-[#e11d48]" />
                  <span>
                    <strong>Sensibiliser</strong> les utilisateurs aux facteurs
                    de risque évitables.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <BookOpen className="mt-0.5 h-5 w-5 text-[#e11d48]" />
                  <span>
                    <strong>Rendre l'analyse médicale accessible</strong> à
                    tous, qu'on soit professionnel, patient ou étudiant.
                  </span>
                </li>
              </ul>
            </div>
            <blockquote className="text-muted-foreground animate-slide-up animate-delay-400 border-l-4 border-[#e11d48] pl-4 italic">
              Parce que <strong>comprendre son cœur</strong>, c'est déjà
              commencer à le protéger.
            </blockquote>
          </div>
          <div className="flex flex-1 justify-center">
            <Skeleton className="h-80 w-full animate-pulse rounded-lg">
              <div className="text-muted-foreground flex h-full items-center justify-center">
                Image d'un cœur stylisé en 3D avec ligne ECG
              </div>
            </Skeleton>
          </div>
        </div>
      </section>
      {/* Objectives Section */}
      <Separator className="mx-auto my-8 w-full max-w-7xl" />
      <section className="animate-fade-in animate-delay-500 mx-auto w-full max-w-7xl px-4 py-12">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="animate-slide-up text-3xl font-bold tracking-tight">
            Objectifs du projet
          </h2>
          <p className="text-muted-foreground animate-slide-up animate-delay-100 mx-auto max-w-2xl text-lg">
            Heart-IA a été conçu comme un outil intelligent, pédagogique et
            accessible pour répondre à un enjeu majeur de santé publique.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-card border-border animate-slide-up animate-delay-200 rounded-lg border p-6 transition-all">
            <div className="bg-destructive/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <Activity className="text-destructive h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-medium">
              Aider à la décision médicale
            </h3>
            <p className="text-muted-foreground">
              Fournir aux professionnels de santé une estimation rapide et
              claire du risque cardiovasculaire.
            </p>
          </div>

          <div className="bg-card border-border animate-slide-up animate-delay-300 rounded-lg border p-6 transition-all">
            <div className="bg-destructive/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <Users className="text-destructive h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-medium">
              Informer et responsabiliser
            </h3>
            <p className="text-muted-foreground">
              Permettre à chacun·e de mieux comprendre son état de santé et
              d'agir en connaissance de cause.
            </p>
          </div>

          <div className="bg-card border-border animate-slide-up animate-delay-400 rounded-lg border p-6 transition-all">
            <div className="bg-destructive/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <Shield className="text-destructive h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-medium">
              Sensibiliser aux risques
            </h3>
            <p className="text-muted-foreground">
              Mettre en lumière les éléments modifiables (tabac, alimentation,
              activité physique...) pour prévenir les maladies.
            </p>
          </div>

          <div className="bg-card border-border animate-slide-up animate-delay-500 rounded-lg border p-6 transition-all">
            <div className="bg-destructive/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <Database className="text-destructive h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-medium">
              Valoriser les données de santé
            </h3>
            <p className="text-muted-foreground">
              Utiliser les données de plus de 70 000 cas pour entraîner des
              modèles fiables, explicables et éthiques.
            </p>
          </div>

          <div className="bg-card border-border animate-slide-up animate-delay-600 rounded-lg border p-6 transition-all">
            <div className="bg-destructive/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <Brain className="text-destructive h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-medium">Soutenir la recherche</h3>
            <p className="text-muted-foreground">
              Offrir un terrain d'expérimentation pour les chercheurs et les
              étudiants en IA, santé, data science.
            </p>
          </div>

          <div className="bg-card border-border animate-slide-up animate-delay-700 rounded-lg border p-6 transition-all">
            <div className="bg-destructive/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <BookOpen className="text-destructive h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-medium">Éduquer et former</h3>
            <p className="text-muted-foreground">
              Proposer des ressources pédagogiques sur les maladies
              cardiovasculaires et leur prévention.
            </p>
          </div>
        </div>

        <div className="animate-slide-up animate-delay-800 mt-8 text-center">
          <blockquote className="text-muted-foreground text-lg italic">
            <Brain className="text-destructive mr-2 inline h-5 w-5" />
            Un projet à la croisée de l'intelligence artificielle, de la
            prévention et de la pédagogie.
          </blockquote>
        </div>
      </section>
      {/* Features Section */}
      <Separator className="mx-auto my-8 w-full max-w-7xl" />
      <section className="animate-fade-in animate-delay-600 mx-auto w-full max-w-7xl px-4 py-12">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="animate-slide-up text-3xl font-bold tracking-tight">
            Fonctionnalités principales
          </h2>
          <p className="text-muted-foreground animate-slide-up animate-delay-100 mx-auto max-w-2xl text-lg">
            Heart-IA propose un ensemble de fonctionnalités simples et efficaces
            pour comprendre et prévenir les risques cardiovasculaires.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="bg-card border-border animate-slide-up animate-delay-200 overflow-hidden rounded-lg border transition-all">
            <div className="space-y-4 p-6">
              <div className="flex items-center gap-3">
                <div className="bg-destructive/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <Activity className="text-destructive h-5 w-5" />
                </div>
                <h3 className="text-xl font-medium">
                  Analyse du risque cardiovasculaire
                </h3>
              </div>
              <p className="text-muted-foreground">
                Saisie des données du patient et prédiction du risque (court,
                moyen, long terme) basée sur des modèles d'IA entraînés sur plus
                de 70 000 dossiers médicaux.
              </p>
            </div>
            <div className="bg-secondary border-border border-t p-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Précision du modèle: 91%
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                >
                  Essayer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-card border-border animate-slide-up animate-delay-300 overflow-hidden rounded-lg border transition-all">
            <div className="space-y-4 p-6">
              <div className="flex items-center gap-3">
                <div className="bg-destructive/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <BarChart2 className="text-destructive h-5 w-5" />
                </div>
                <h3 className="text-xl font-medium">
                  Visualisation des résultats
                </h3>
              </div>
              <p className="text-muted-foreground">
                Affichage clair du score de risque, catégorisation (faible à
                très élevé), graphiques interactifs pour comprendre l'impact de
                chaque facteur.
              </p>
            </div>
            <div className="bg-secondary border-border border-t p-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Graphiques interactifs
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                >
                  Voir un exemple
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-card border-border animate-slide-up animate-delay-400 overflow-hidden rounded-lg border transition-all">
            <div className="space-y-4 p-6">
              <div className="flex items-center gap-3">
                <div className="bg-destructive/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <Brain className="text-destructive h-5 w-5" />
                </div>
                <h3 className="text-xl font-medium">
                  Explication des facteurs de risque
                </h3>
              </div>
              <p className="text-muted-foreground">
                Interprétation en langage simple, classement des facteurs les
                plus influents et explication de leur impact sur la santé
                cardiovasculaire.
              </p>
            </div>
            <div className="bg-secondary border-border border-t p-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  IA explicable
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                >
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-card border-border animate-slide-up animate-delay-500 overflow-hidden rounded-lg border transition-all">
            <div className="space-y-4 p-6">
              <div className="flex items-center gap-3">
                <div className="bg-destructive/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <Shield className="text-destructive h-5 w-5" />
                </div>
                <h3 className="text-xl font-medium">
                  Recommandations personnalisées
                </h3>
              </div>
              <p className="text-muted-foreground">
                Conseils de prévention adaptés au profil de l'utilisateur, suivi
                historique de l'évolution et suggestions d'amélioration du mode
                de vie.
              </p>
            </div>
            <div className="bg-secondary border-border border-t p-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Personnalisé pour vous
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                >
                  Découvrir
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Dataset Section */}
      <Separator className="mx-auto my-8 w-full max-w-7xl" />
      <section className="animate-fade-in animate-delay-700 mx-auto w-full max-w-7xl px-4 py-12">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <div className="flex-1 space-y-6">
            <h2 className="animate-slide-up text-3xl font-bold tracking-tight">
              Le jeu de données derrière Heart-IA
            </h2>
            <p className="text-muted-foreground animate-slide-up animate-delay-100 text-lg">
              Heart-IA repose sur un dataset public issu de{' '}
              <strong>Kaggle</strong>, contenant plus de
              <strong> 70 000 enregistrements médicaux réels</strong>. Ces
              données permettent d'analyser les facteurs de risque
              cardiovasculaire et d'entraîner des modèles prédictifs fiables.
            </p>

            <div className="bg-secondary border-border animate-slide-up animate-delay-200 rounded-lg border p-6">
              <h3 className="mb-4 text-xl font-medium">
                Ce que contient le dataset :
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="bg-destructive/10 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full">
                      <Users className="text-destructive h-3 w-3" />
                    </div>
                    <div>
                      <p className="font-medium">Données démographiques</p>
                      <p className="text-muted-foreground text-sm">
                        Âge, genre, taille, poids
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="bg-destructive/10 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full">
                      <Activity className="text-destructive h-3 w-3" />
                    </div>
                    <div>
                      <p className="font-medium">Mesures cliniques</p>
                      <p className="text-muted-foreground text-sm">
                        Tension artérielle, cholestérol, glucose
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="bg-destructive/10 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full">
                      <Heart className="text-destructive h-3 w-3" />
                    </div>
                    <div>
                      <p className="font-medium">Habitudes de vie</p>
                      <p className="text-muted-foreground text-sm">
                        Tabagisme, alcool, activité physique
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="bg-destructive/10 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full">
                      <Shield className="text-destructive h-3 w-3" />
                    </div>
                    <div>
                      <p className="font-medium">Cible</p>
                      <p className="text-muted-foreground text-sm">
                        Présence ou absence de maladie cardiovasculaire
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-slide-up animate-delay-300 space-y-4">
              <h3 className="text-xl font-medium">Pourquoi ce dataset ?</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="bg-destructive/10 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full">
                    <Database className="text-destructive h-3 w-3" />
                  </div>
                  <span>
                    Il est <strong>riche, équilibré</strong>, et couvre les
                    principaux facteurs de risque cardio.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-destructive/10 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full">
                    <BarChart2 className="text-destructive h-3 w-3" />
                  </div>
                  <span>
                    Il permet une{' '}
                    <strong>analyse exploratoire pertinente</strong> et la
                    création de <strong>modèles prédictifs réalistes</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-destructive/10 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full">
                    <BookOpen className="text-destructive h-3 w-3" />
                  </div>
                  <span>
                    C'est un support idéal pour une{' '}
                    <strong>démarche éducative</strong>, reproductible et
                    accessible à tous.
                  </span>
                </li>
              </ul>
            </div>

            <blockquote className="border-destructive text-muted-foreground animate-slide-up animate-delay-400 border-l-4 pl-4 italic">
              <Database className="text-destructive mr-2 inline h-4 w-4" />
              Source :{' '}
              <a
                href="https://www.kaggle.com/datasets/sulianova/cardiovascular-disease-dataset"
                className="text-[#e11d48] hover:underline"
              >
                Kaggle - Cardiovascular Disease Dataset
              </a>
            </blockquote>
          </div>

          <div className="flex flex-1 justify-center">
            <Skeleton className="h-80 w-full animate-pulse rounded-lg">
              <div className="text-muted-foreground flex h-full items-center justify-center">
                Visualisation du dataset avec graphiques de distribution
              </div>
            </Skeleton>
          </div>
        </div>
      </section>
      {/* Call to Action Section */}
      <Separator className="mx-auto my-8 w-full max-w-7xl" />
      <p className="p-2">coded with love by Heart-IA team</p>
    </div>
  );
}
