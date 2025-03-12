import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function BudgetSummary({ budgetSummary }) {
  return (
    <View style={{
        marginTop: 20,
    }}>
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>
            <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 20,
            }}>💵 Budget Summary</Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 15,
                marginTop: 5,
            }}>(Approximate Cost)</Text>
        </View>

      {/* Accomodation Cost */}
        <View style={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 18,
                color: Colors.PRIMARY,
            }}>Total Accomodation Cost</Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 18,
                color: "#7d7d7d",
            }}>₹ {budgetSummary?.accommodationINR}</Text>
        </View>

        {/* Activities Cost */}
        <View style={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 18,
                color: Colors.PRIMARY,
            }}>Total Activities Cost</Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 18,
                color: '#7d7d7d',
            }}>₹ {budgetSummary?.activitiesINR}</Text>
        </View>

        {/* Flight Cost */}
        <View style={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 18,
                color: Colors.PRIMARY,
            }}>Total Flight Cost</Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 18,
                color: '#7d7d7d',
            }}>₹ {budgetSummary?.flightsINR}</Text>
        </View>
        {/* Food Cost */}
        <View style={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 18,
                color: Colors.PRIMARY,
            }}>Total Food Cost</Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 18,
                color: '#7d7d7d',
            }}>₹ {budgetSummary?.foodINR}</Text>
        </View>

        {/* Transport Cost */}
        <View style={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 18,
                color: Colors.PRIMARY,
            }}>Total Transport Cost</Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 18,
                color: '#7d7d7d',
            }}>₹ {budgetSummary?.transportINR}</Text>
        </View>

        {/* Horizontal Line */}
      <View style={{
        marginTop: 15,
        height: 1,
        backgroundColor: Colors.PRIMARY,
        opacity: 0.6,
      }} />

        {/* Total Budget */}
        <View style={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 18,
                color: Colors.PRIMARY,
            }}>Total Budget</Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 18,
                color: '#7d7d7d',
            }}>₹ {budgetSummary?.totalApproximateCostINR}</Text>
        </View>
    </View>
  )
}