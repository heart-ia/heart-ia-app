"""
Cardiovascular disease analysis service.

This module provides services for cardiovascular disease analysis.
"""

import os
from typing import List

import pandas as pd

from api.models.cardio import ChartData, CorrelationAnalysis, Dataset, DatasetStatistics


class CardioService:
    """Service for cardiovascular disease analysis."""

    def __init__(self):
        """Initialize the service."""
        self.data = None
        self.load_data()

    def load_data(self) -> None:
        """
        Load and preprocess the dataset.

        This method loads the cardio_train.csv dataset and performs the following preprocessing steps:
        1. Removes the 'id' column
        2. Converts age from days to years
        3. Creates a BMI feature from height and weight
        4. Removes height and weight columns
        5. Filters out outliers in blood pressure and BMI
        """
        # Get the absolute path to the dataset
        dataset_path = os.path.join(
            os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
            "dataset",
            "cardio_train.csv"
        )

        # Load the dataset
        self.data = pd.read_csv(dataset_path, sep=';', header=0)

        # Preprocess the dataset
        # 1. Remove the 'id' column
        self.data.drop(columns=['id'], inplace=True)

        # 2. Convert age from days to years
        self.data['age'] = (self.data['age'] / 365.25).astype(int)

        # 3. Create a BMI feature from height and weight
        self.data['IMC'] = self.data['weight'] / (self.data['height'] / 100) ** 2

        # 4. Remove height and weight columns
        self.data.drop(columns=['weight', 'height'], inplace=True)

        # 5. Filter out outliers in blood pressure and BMI
        self.data = self.data[(self.data['ap_hi'] >= 90) & (self.data['ap_hi'] <= 200)]
        self.data = self.data[(self.data['ap_lo'] >= 60) & (self.data['ap_lo'] <= 140)]
        self.data = self.data[(self.data['IMC'] >= 10) & (self.data['IMC'] <= 80)]

    def get_dataset_statistics(self) -> DatasetStatistics:
        """
        Get dataset statistics.

        Returns:
            DatasetStatistics: Dataset statistics.
        """
        if self.data is None:
            self.load_data()

        # Calculate statistics
        total_records = len(self.data)
        cardio_positive = len(self.data[self.data['cardio'] == 1])
        cardio_negative = len(self.data[self.data['cardio'] == 0])

        age_range = {
            'min': float(self.data['age'].min()),
            'max': float(self.data['age'].max()),
            'mean': float(self.data['age'].mean()),
            'median': float(self.data['age'].median())
        }

        bmi_range = {
            'min': float(self.data['IMC'].min()),
            'max': float(self.data['IMC'].max()),
            'mean': float(self.data['IMC'].mean()),
            'median': float(self.data['IMC'].median())
        }

        blood_pressure_range = {
            'systolic': {
                'min': float(self.data['ap_hi'].min()),
                'max': float(self.data['ap_hi'].max()),
                'mean': float(self.data['ap_hi'].mean()),
                'median': float(self.data['ap_hi'].median())
            },
            'diastolic': {
                'min': float(self.data['ap_lo'].min()),
                'max': float(self.data['ap_lo'].max()),
                'mean': float(self.data['ap_lo'].mean()),
                'median': float(self.data['ap_lo'].median())
            }
        }

        return DatasetStatistics(
            total_records=total_records,
            cardio_positive=cardio_positive,
            cardio_negative=cardio_negative,
            age_range=age_range,
            bmi_range=bmi_range,
            blood_pressure_range=blood_pressure_range
        )

    def get_age_distribution_chart(self) -> ChartData:
        """
        Returns age distribution chart data.

        Each object in the returned list contains:
          - age: the individual's age,
          - num_sick_people: number of individuals with cardiovascular disease (cardio == 1),
          - num_healthy_people: number of individuals without cardiovascular disease (cardio == 0).
        """
        if self.data is None:
            self.load_data()

        # Create a pivot table aggregating the data by age and cardio status
        distribution = (
            self.data
            .pivot_table(index="age", columns="cardio", aggfunc="size", fill_value=0)
            .reset_index()
            .rename(columns={0: "num_healthy_people", 1: "num_sick_people"})
        )

        # Convert the DataFrame to a list of dictionaries
        chart_data = distribution.to_dict(orient="records")

        return ChartData(
            chart_type="histogram",
            title="Distribution des maladies cardiovasculaires selon l'âge",
            description="Ce graphique montre la répartition des individus atteints ou non de maladies cardiovasculaires en fonction de leur âge.",
            x_label="Âge",
            y_label="Nombre de cas",
            data=chart_data
        )

    def get_gender_distribution_chart(self) -> ChartData:
        """
        Returns gender distribution chart data.

        Each record contains:
          - gender: the gender label ("Femme" or "Homme"),
          - num_healthy_people: number of individuals without cardiovascular disease (cardio == 0),
          - num_sick_people: number of individuals with cardiovascular disease (cardio == 1).
        """
        if self.data is None:
            self.load_data()

        # Create a pivot table to aggregate counts by gender and cardio status
        distribution = (
            self.data
            .pivot_table(index="gender", columns="cardio", aggfunc="size", fill_value=0)
            .reset_index()
            .rename(columns={0: "num_healthy_people", 1: "num_sick_people"})
        )

        # Map numeric gender values to descriptive labels
        distribution["gender"] = distribution["gender"].map({1: "Femme", 2: "Homme"})

        # Convert the DataFrame to a list of dictionaries
        chart_data = distribution.to_dict(orient="records")

        return ChartData(
            chart_type="histogram",
            title="Répartition des maladies cardiovasculaires selon le genre",
            description="Ce graphique montre la répartition des cas de maladies cardiovasculaires entre les femmes et les hommes.",
            x_label="Genre",
            y_label="Nombre de cas",
            data=chart_data
        )

    def get_blood_pressure_chart(self) -> ChartData:
        """
        Get blood pressure chart data.

        Returns:
            ChartData: Blood pressure chart data.
        """
        if self.data is None:
            self.load_data()

        # Sample data for the scatter plot (to avoid too many points)
        sample_data = self.data.sample(n=min(5000, len(self.data)), random_state=42)

        # Convert to list of dictionaries for the chart
        chart_data = []
        for _, row in sample_data.iterrows():
            chart_data.append({
                'ap_hi': int(row['ap_hi']),
                'ap_lo': int(row['ap_lo']),
                'cardio': int(row['cardio']),
                'age': int(row['age']),
                'gender': int(row['gender'])
            })

        return ChartData(
            chart_type="scatter",
            title="Pression artérielle (Systolique vs Diastolique)",
            description="Ce graphique en nuage de points montre la relation entre la pression systolique (ap_hi) et la pression diastolique (ap_lo) pour chaque individu.",
            x_label="Pression Systolique",
            y_label="Pression Diastolique",
            data=chart_data
        )

    def get_bmi_age_chart(self) -> ChartData:
        """
        Get BMI vs age chart data.

        Returns:
            ChartData: BMI vs age chart data.
        """
        if self.data is None:
            self.load_data()

        # Sample data for the scatter plot (to avoid too many points)
        sample_data = self.data.sample(n=min(5000, len(self.data)), random_state=42)

        # Convert to list of dictionaries for the chart
        chart_data = []
        for _, row in sample_data.iterrows():
            chart_data.append({
                'age': int(row['age']),
                'IMC': float(row['IMC']),
                'cardio': int(row['cardio'])
            })

        return ChartData(
            chart_type="scatter",
            title="IMC selon l'âge et présence de maladie cardiovasculaire",
            description="Ce nuage de points présente la distribution de l'indice de masse corporelle (IMC) en fonction de l'âge, avec un code couleur indiquant la présence ou non de maladies cardiovasculaires.",
            x_label="Âge",
            y_label="Indice de Masse Corporelle",
            data=chart_data
        )

    def get_cholesterol_chart(self) -> ChartData:
        """
        Get cholesterol chart data.

        Returns:
            ChartData: Cholesterol chart data.
        """
        if self.data is None:
            self.load_data()

        # Create a pivot table aggregating the data by cholesterol and cardio status
        distribution = (
            self.data
            .pivot_table(index="cholesterol", columns="cardio", aggfunc="size", fill_value=0)
            .reset_index()
            .rename(columns={0: "num_healthy_people", 1: "num_sick_people"})
        )

        # Convert the DataFrame to a list of dictionaries
        chart_data = distribution.to_dict(orient="records")

        return ChartData(
            chart_type="box",
            title="Distribution du cholestérol selon la présence de maladies cardiovasculaires",
            description="Ce boxplot compare la répartition des niveaux de cholestérol entre les individus avec et sans maladie cardiovasculaire.",
            x_label="Maladie Cardio (0=Non, 1=Oui)",
            y_label="Cholestérol",
            data=chart_data
        )

    def get_physical_activity_chart(self) -> ChartData:
        """
        Returns physical activity distribution chart data.

        Each record contains:
          - active: the physical activity status (0 = No, 1 = Yes),
          - num_healthy_people: number of individuals without cardiovascular disease (cardio == 0),
          - num_sick_people: number of individuals with cardiovascular disease (cardio == 1).
        """
        if self.data is None:
            self.load_data()

        # Create a pivot table to aggregate counts by active and cardio status
        distribution = (
            self.data
            .pivot_table(index="active", columns="cardio", aggfunc="size", fill_value=0)
            .reset_index()
            .rename(columns={0: "num_healthy_people", 1: "num_sick_people"})
        )

        # Convert the DataFrame to a list of dictionaries
        chart_data = distribution.to_dict(orient="records")

        return ChartData(
            chart_type="histogram",
            title="Lien entre activité physique et maladies cardiovasculaires",
            description="Ce graphique compare le nombre de personnes atteintes ou non de maladies cardiovasculaires selon qu'elles déclarent pratiquer une activité physique régulière",
            x_label="Activité Physique",
            y_label="Nombre de cas",
            data=chart_data
        )

    def get_correlation_analysis(self) -> CorrelationAnalysis:
        """
        Get correlation analysis.

        Returns:
            CorrelationAnalysis: Correlation analysis.
        """
        if self.data is None:
            self.load_data()

        # Calculate correlation matrix
        corr = self.data[
            ['age', 'IMC', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc', 'smoke', 'alco', 'active', 'cardio']].corr()

        # Round correlation values to 2 decimal places
        corr_rounded = corr.round(2)

        # Convert to list of lists for the correlation matrix
        correlation_matrix = corr_rounded.values.tolist()

        # Get feature names
        feature_names = corr.columns.tolist()

        # Get top correlations with cardio
        cardio_corr = corr_rounded['cardio'].drop('cardio').sort_values(ascending=False)
        top_correlations = []
        for feature, value in cardio_corr.items():
            top_correlations.append({
                'feature': feature,
                'correlation': float(value)
            })

        return CorrelationAnalysis(
            correlation_matrix=correlation_matrix,
            feature_names=feature_names,
            top_correlations=top_correlations
        )

    def get_smoking_chart(self) -> ChartData:
        """
        Returns smoking distribution chart data.

        Each record contains:
          - smoke: the smoking status (0 = No, 1 = Yes),
          - num_healthy_people: number of individuals without cardiovascular disease (cardio == 0),
          - num_sick_people: number of individuals with cardiovascular disease (cardio == 1).
        """
        if self.data is None:
            self.load_data()

        # Create a pivot table to aggregate counts by smoke and cardio status
        distribution = (
            self.data
            .pivot_table(index="smoke", columns="cardio", aggfunc="size", fill_value=0)
            .reset_index()
            .rename(columns={0: "num_healthy_people", 1: "num_sick_people"})
        )

        # Convert the DataFrame to a list of dictionaries
        chart_data = distribution.to_dict(orient="records")

        return ChartData(
            chart_type="histogram",
            title="Tabagisme et maladies cardiovasculaires",
            description="Ce graphique compare le nombre de personnes atteintes ou non de maladies cardiovasculaires selon qu'elles fument.",
            x_label="Tabagisme",
            y_label="Nombre de cas",
            data=chart_data
        )

    def get_alcohol_chart(self) -> ChartData:
        """
        Returns alcohol consumption distribution chart data.

        Each record contains:
          - alco: the alcohol consumption status (0 = No, 1 = Yes),
          - num_healthy_people: number of individuals without cardiovascular disease (cardio == 0),
          - num_sick_people: number of individuals with cardiovascular disease (cardio == 1).
        """
        if self.data is None:
            self.load_data()

        # Create a pivot table to aggregate counts by alco and cardio status
        distribution = (
            self.data
            .pivot_table(index="alco", columns="cardio", aggfunc="size", fill_value=0)
            .reset_index()
            .rename(columns={0: "num_healthy_people", 1: "num_sick_people"})
        )

        # Convert the DataFrame to a list of dictionaries
        chart_data = distribution.to_dict(orient="records")

        return ChartData(
            chart_type="histogram",
            title="Consommation d'alcool et maladies cardiovasculaires",
            description="Ce graphique compare le nombre de personnes atteintes ou non de maladies cardiovasculaires selon qu'elles consomment de l'alcool.",
            x_label="Consommation d'alcool (0=Non, 1=Oui)",
            y_label="Nombre de cas",
            data=chart_data
        )

    def get_glucose_chart(self) -> ChartData:
        """
        Get glucose chart data.

        Returns:
            ChartData: Glucose chart data.
        """
        if self.data is None:
            self.load_data()

        # Create a pivot table aggregating the data by glucose and cardio status
        distribution = (
            self.data
            .pivot_table(index="gluc", columns="cardio", aggfunc="size", fill_value=0)
            .reset_index()
            .rename(columns={0: "num_healthy_people", 1: "num_sick_people"})
        )

        # Convert the DataFrame to a list of dictionaries
        chart_data = distribution.to_dict(orient="records")

        return ChartData(
            chart_type="box",
            title="Distribution du glucose selon la présence de maladies cardiovasculaires",
            description="Ce boxplot compare la répartition des niveaux de glucose entre les individus avec et sans maladie cardiovasculaire.",
            x_label="Maladie Cardio (0=Non, 1=Oui)",
            y_label="Glucose",
            data=chart_data
        )

    def get_blood_pressure_correlation_chart(self) -> ChartData:
        """
        Get blood pressure correlation chart data.

        Returns:
            ChartData: Blood pressure correlation chart data.
        """
        if self.data is None:
            self.load_data()

        # Sample data for the scatter plot (to avoid too many points)
        sample_data = self.data.sample(n=min(5000, len(self.data)), random_state=42)

        # Calculate correlation coefficient
        correlation = sample_data['ap_hi'].corr(sample_data['ap_lo'])
        correlation_rounded = round(correlation, 2)

        # Convert to list of dictionaries for the chart
        chart_data = []
        for _, row in sample_data.iterrows():
            chart_data.append({
                'ap_hi': int(row['ap_hi']),
                'ap_lo': int(row['ap_lo']),
                'cardio': int(row['cardio'])
            })

        return ChartData(
            chart_type="scatter",
            title="Corrélation entre pression systolique et diastolique",
            description=f"Ce nuage de points montre la relation entre la pression artérielle systolique (ap_hi) et la pression diastolique (ap_lo) pour chaque individu du dataset. La corrélation entre ces deux variables est de {correlation_rounded}.",
            x_label="Pression Systolique",
            y_label="Pression Diastolique",
            data=chart_data
        )

    def get_risk_factors_radar_chart(self) -> ChartData:
        """
        Get risk factors radar chart data.

        Returns:
            ChartData: Risk factors radar chart data.
        """
        if self.data is None:
            self.load_data()

        # Calculate average values for main risk factors
        avg_age = float(self.data['age'].mean())
        avg_imc = float(self.data['IMC'].mean())
        avg_ap_hi = float(self.data['ap_hi'].mean())
        avg_cholesterol = float(self.data['cholesterol'].mean())
        avg_gluc = float(self.data['gluc'].mean())

        # Create data for the radar chart
        chart_data = [
            {
                'factor': 'Âge moyen',
                'value': round(avg_age, 2)
            },
            {
                'factor': 'IMC moyen',
                'value': round(avg_imc, 2)
            },
            {
                'factor': 'Pression Systolique moyenne',
                'value': round(avg_ap_hi, 2)
            },
            {
                'factor': 'Cholestérol moyen',
                'value': round(avg_cholesterol, 2)
            },
            {
                'factor': 'Glucose moyen',
                'value': round(avg_gluc, 2)
            }
        ]

        return ChartData(
            chart_type="radar",
            title="Facteurs moyens associés au risque cardiovasculaire",
            description="Ce graphique radar met en lumière les valeurs moyennes de plusieurs facteurs de risque cardiovasculaire parmi les individus atteints de maladies cardio.",
            x_label="Facteur",
            y_label="Valeur moyenne",
            data=chart_data
        )

    def get_all_charts(self) -> List[ChartData]:
        """
        Get all chart data.

        Returns:
            List[ChartData]: List of all chart data.
        """
        return [
            self.get_age_distribution_chart(),
            self.get_gender_distribution_chart(),
            self.get_blood_pressure_chart(),
            self.get_blood_pressure_correlation_chart(),
            self.get_bmi_age_chart(),
            self.get_cholesterol_chart(),
            self.get_glucose_chart(),
            self.get_physical_activity_chart(),
            self.get_smoking_chart(),
            self.get_alcohol_chart(),
            self.get_risk_factors_radar_chart()
        ]

    def get_complete_dataset(self) -> Dataset:
        """
        Get the complete dataset.

        Returns:
            Dataset: The complete dataset with all patient records.
        """
        if self.data is None:
            self.load_data()

        # Convert the DataFrame to a list of dictionaries
        dataset_records = self.data.to_dict(orient="records")

        return Dataset(
            data=dataset_records,
            total_records=len(dataset_records)
        )
