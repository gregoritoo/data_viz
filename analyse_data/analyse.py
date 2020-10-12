import numpy as np
import pandas as pd 
import matplotlib.pyplot as plt

df=pd.read_csv('caracteristiques-2018.csv',sep=',',encoding='latin-1')


# df["dep"]=[int(str(df.iloc[i]["dep"])[:-1]) for i in range(len(df))]
# df["count"]=[1]*len(df)
# df=df.groupby("dep").sum()
# print(df)
# df.to_csv("departement.csv")


## Compute month and lum

# df=df[["mois","lum"]]
# df["count"] = [1] * len(df)
# df = df.groupby( ["mois","lum"]).sum()

# tab=list(df["count"])
# print(tab)
# tab=[tab[i*5:(i+1)*5] for i in range(12)]
# print(tab)
# tab = np.asarray(tab)
# print(tab)
# np.savetxt("mois_lum.csv", tab, delimiter =",")

## test process

df=df[["mois","lum"]]
df["count"] = [1] * len(df)
df = df.groupby( ["mois","lum"]).sum()
print(df)

df=pd.read_csv('mois_lum.csv',sep=',',encoding='latin-1')
print(df)