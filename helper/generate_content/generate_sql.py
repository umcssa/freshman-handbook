import glob
import codecs
import os

content_files = os.listdir('content')
print(content_files)

hierarchy = [
        ['出国前准备', [
            ['签证', [
                ['签证申请流程', 0],
                ['签证所需材料', 0]]],
            ['航程信息', [
                ['机场', 0],
                ['机票预订', 0],
                ['从机场到学校的交通方式', 0]]],
            ['行李准备', [
                ['行李规格', 0],
                ['文具', 0],
                ['衣服服饰', 0],
                ['生活用品', 0],
                ['药',0]]],
            ['体检 & 疫苗 & 医疗保险', [
                ['体检和疫苗', 0],
                ['医疗保险', 0]]],
            ['学费 + Housing DDL', 0]]],
        ['入学指南', [
            ['Mandatory Immigration Check-In', 0],
            ['International Orientation', 0],
            ['M-Card', 0],
            ['手机开通', 0],
            ['银行开户', 0],
            ['注册选课', 0],
            ['宿舍介绍', [
                ['中校区宿舍', 0],
                ['Hill居住区', 0],
                ['北校区宿舍', 0],
                ['校内宿舍信息补充', 0]]],
            ['Learning Communities', [
                ['Residential Communities', 0],
                ['Non-Residential Communities', 0],
                ['Learning Communities 信息补充', 0]]],
            ['校外租房', [
                ['中校区房源', 0],
                ['北校区房源', 0],
                ['校外租房信息', 0]]],
            ['家具购买', 0],
            ['水、电、网及电视信号办理', 0]]],
        ['超市购物', [
            ['日常用品', [['外国超市', 0], ['中国超市', 0], ['一元店', 0]]],
            ['服装', 0],
            ['电器和文具', 0],
            ['网购', 0],
            ['食材和药品', 0]]],
        ['休闲娱乐', [
            ['电影院', 0],
            ['健身场所', 0],
            ['音乐会', 0],
            ['体育赛事观看', 0]]],
        ['交通', [
            ['驾照考试', 0],
            ['Blue Bus & AATA Bus', 0],
            ['Safe Ride & Taxi & 租车', 0]]],
        ['社团介绍', [
            ['安娜说话剧社 (Thus Spoke Ann Arbor)', 0],
            ['Dream Crops', 0],
            ['茉莉舞团：一双舞鞋 一个梦想', 0],
            ['安娜贝拉 (Annappella)', 0],
            ['HKSA', 0],
            ['Michigan Chinese Business Club (MCBC)', 0],
            ['中国经济发展协会 (ACED)', 0],
            ['中华创新与创业联盟 (CEN)', 0],
            ['安城文化沙龙', 0],
            ['VeryUS', 0],
            ['密西根大学中国本科学生会', 0]]]]


def getTitles(hierarchy, titles):
    for item in hierarchy:
        if not item[1]:
            titles.append(item[0])
        else:
            getTitles(item[1], titles)


titles = []
getTitles(hierarchy, titles)

sql = 'INSERT INTO article VALUES '

for title in titles:
    found = False
    if title + '.html' in content_files:
        # print(title)
        # file = open(content_file)
        # print(file.read())

        content = codecs.open('content/' + title + '.html','r','utf-8').read()

        if "'" in content:
            content = content.replace("'", "''")
            print(content)

        sql += "('{}', '{}'),\n".format(title, content)
    else:
        print(title)
        sql += "('{}', '{}'),\n".format(title, title + '\n文章内容')

sql = sql[:-2] + ';\n'

file = codecs.open("data.sql", "w", "utf-8")
file.write(sql.replace('img src="./uploads/','img src="/freshman-handbook/uploads/'))
file.close()
