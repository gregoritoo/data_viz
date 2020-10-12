import numpy as np
import pandas as pd 
import matplotlib.pyplot as plt

"""df=pd.read_csv('vehicules-2018.csv',sep=',',encoding='latin-1')
df2=pd.read_csv('usagers-2018.csv',sep=',',encoding='latin-1')
df2["count"]=[1]*len(df2)
print(df)
print(df2)
df = df.merge(df2, on='Num_Acc', how='inner', suffixes=('_1', '_2'))
print(df)
df=df.groupby(["catv","grav","secu"]).sum()
print(df)
df.to_csv("join.csv")"""
"""
df=pd.read_csv("join.csv")
#df[df["grav"]==1] = "Indemne"
df1=df[df["grav"]==1]
df1["grav"]="Indemne"
print(df1)
df2=df[df["grav"]==2]
df2["grav"]="Tué"
df3=df[df["grav"]==3]
df3["grav"]="Blessé hospitalisé"
df4=df[df["grav"]==4]
df4["grav"]="Blessé léger"

df=pd.concat([df1,df2,df3,df4], ignore_index=True)
df.to_csv("join.csv")

df=pd.read_csv("join.csv")
df1=df[df["secu"]==11 ]
df1["secu"]="Ceinture"
df2=df[df["secu"]==21]
df2["secu"]="Casque"
df3=df[df["secu"]==31]
df3["secu"]="Dispositif enfants"
df4=df[df["secu"]==41]
df4["secu"]="Equipement réfléchissant"
df5=df[df["secu"]==91]
df5["secu"]="Autre"
df6=df[df["secu"]==12 ]
df6["secu"]="Pas de sécurité"
df7=df[df["secu"]==22]
df7["secu"]="Pas de sécurité"
df8=df[df["secu"]==32]
df8["secu"]="Pas de sécurité"
df9=df[df["secu"]==42]
df9["secu"]="Pas de sécurité"
df10=df[df["secu"]==92]
df10["secu"]="Pas de sécurité"
df11=df[df["secu"]==12 ]
df11["secu"]="Non determinable"
df12=df[df["secu"]==22]
df12["secu"]="Non determinable"
df13=df[df["secu"]==32]
df13["secu"]="Non determinable"
df14=df[df["secu"]==42]
df14["secu"]="Non determinable"
df15=df[df["secu"]==92]
df15["secu"]="Non determinable"
df=pd.concat([df1,df2,df3,df4,df5,df5,df6,df7,df8,df9,df10,df11,df12,df13,df14,df15], ignore_index=True)
print(df)
df.to_csv("join.csv")

df=pd.read_csv('caracteristiques-2018.csv',sep=',',encoding='latin-1')
df["count"]=[1]*len(df)
print(df)
df=df.groupby(["jour","mois","an"]).sum()
print(df)
df.to_csv("time.csv")
"""


df=pd.read_csv('caracteristiques-2018.csv',sep=',',encoding='latin-1')
df["count"]=[1]*len(df)
print(df)
df=df.groupby(["lum"]).sum()
print(df)
df.to_csv("group_lum.csv")