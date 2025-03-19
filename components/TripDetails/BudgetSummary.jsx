import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { width, height } from '../../constants/Dimensions';

export default function BudgetSummary({ budgetSummary }) {
  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>
                💵 Budget Summary
            </Text>
            <Text style={styles.subtitle}>
                (Approximate Cost)
            </Text>
        </View>

      {/* Accomodation Cost */}
        <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
                Total Accomodation Cost
            </Text>
            <Text style={styles.infoPriceText}>
                ₹ {budgetSummary?.accommodationINR}
            </Text>
        </View>

        {/* Activities Cost */}
        <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
                Total Activities Cost
            </Text>
            <Text style={styles.infoPriceText}>
                ₹ {budgetSummary?.activitiesINR}
            </Text>
        </View>

        {/* Flight Cost */}
        <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
                Total Flight Cost
            </Text>
            <Text style={styles.infoPriceText}>
                ₹ {budgetSummary?.flightsINR}
            </Text>
        </View>
        {/* Food Cost */}
        <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
                Total Food Cost
            </Text>
            <Text style={styles.infoPriceText}>
                ₹ {budgetSummary?.foodINR}
            </Text>
        </View>

        {/* Transport Cost */}
        <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
                Total Transport Cost
            </Text>
            <Text style={styles.infoPriceText}>
                ₹ {budgetSummary?.transportINR}
            </Text>
        </View>

        {/* Horizontal Line */}
      <View style={styles.horizontalLine} />

        {/* Total Budget */}
        <View style={styles.totalContainer}>
            <Text style={styles.totalText}>
                Total Budget
            </Text>
            <Text style={styles.infoText}>
                ₹ {budgetSummary?.totalApproximateCostINR}
            </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: width * .05,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: 'outfit-bold',
        fontSize: width * .05,
    },
    subtitle: {
        fontFamily: 'outfit',
        fontSize: width * .035,
        marginTop: width * .01,
    },
    infoContainer: {
        marginTop: width * .02,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoText: {
        fontFamily: 'outfit',
        fontSize: width * .04,
        color: Colors.PRIMARY,
    },
    infoPriceText: {
        fontFamily: 'outfit',
        fontSize: width * .04,
        color: '#7d7d7d',
    },
    horizontalLine: {
        marginTop: width * .04,
        height: 1,
        backgroundColor: Colors.PRIMARY,
        opacity: .6,
    },
    totalContainer: {
        marginTop: width * .035,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalText: {
        fontFamily: 'outfit-bold',
        fontSize: width * .04,
        color: Colors.PRIMARY,
    }
});